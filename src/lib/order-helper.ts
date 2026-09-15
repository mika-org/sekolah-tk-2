import { prisma } from "@/lib/prisma";

export type OrderableEntityType = "testimonials" | "teachers" | "programs" | "gallery";

function getDelegate(entity: OrderableEntityType) {
  switch (entity) {
    case "testimonials":
      return prisma.testimonial;
    case "teachers":
      return prisma.teacher;
    case "programs":
      return prisma.program;
    case "gallery":
      return prisma.galleryItem;
    default:
      throw new Error(`Tipe entitas tidak valid: ${entity}`);
  }
}

/**
 * Normalizes all items of a given entity in a school so orders are strictly 1, 2, 3, ...
 */
export async function normalizeOrders(entity: OrderableEntityType, schoolId: string) {
  const delegate: any = getDelegate(entity);
  const items = await delegate.findMany({
    where: { schoolId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
  });

  for (let i = 0; i < items.length; i++) {
    const desired = i + 1;
    if (items[i].orderIndex !== desired) {
      await delegate.update({
        where: { id: items[i].id },
        data: { orderIndex: desired },
      });
    }
  }
}

/**
 * Shifts existing items to make room for a new item at targetOrder.
 * Clamps targetOrder between 1 and (currentCount + 1).
 * Returns the effective targetOrder.
 */
export async function prepareOrderForInsert(
  entity: OrderableEntityType,
  schoolId: string,
  targetOrder: number
): Promise<number> {
  const delegate: any = getDelegate(entity);
  const items = await delegate.findMany({
    where: { schoolId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
  });

  const total = items.length;
  let effectiveOrder = Number(targetOrder) || (total + 1);

  if (effectiveOrder < 1) effectiveOrder = 1;
  if (effectiveOrder > total + 1) effectiveOrder = total + 1;

  // Shift items at or after effectiveOrder
  const itemsToShift = items.filter((item: any) => item.orderIndex >= effectiveOrder);
  for (let i = itemsToShift.length - 1; i >= 0; i--) {
    await delegate.update({
      where: { id: itemsToShift[i].id },
      data: { orderIndex: itemsToShift[i].orderIndex + 1 },
    });
  }

  return effectiveOrder;
}

/**
 * Re-sequences items when an existing item's orderIndex is changed.
 */
export async function handleOrderOnUpdate(
  entity: OrderableEntityType,
  schoolId: string,
  itemId: string,
  targetOrder: number
): Promise<number> {
  const delegate: any = getDelegate(entity);
  const allItems = await delegate.findMany({
    where: { schoolId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
  });

  const otherItems = allItems.filter((item: any) => item.id !== itemId);
  let effectiveOrder = Number(targetOrder) || 1;
  if (effectiveOrder < 1) effectiveOrder = 1;
  if (effectiveOrder > otherItems.length + 1) effectiveOrder = otherItems.length + 1;

  // Insert target into desired position in list
  otherItems.splice(effectiveOrder - 1, 0, { id: itemId, orderIndex: effectiveOrder });

  // Update all items whose order changed
  for (let i = 0; i < otherItems.length; i++) {
    const desired = i + 1;
    if (otherItems[i].id === itemId) {
      effectiveOrder = desired;
    } else if (otherItems[i].orderIndex !== desired) {
      await delegate.update({
        where: { id: otherItems[i].id },
        data: { orderIndex: desired },
      });
    }
  }

  return effectiveOrder;
}

/**
 * Closes gaps after an item is deleted.
 */
export async function normalizeAfterDelete(entity: OrderableEntityType, schoolId: string) {
  await normalizeOrders(entity, schoolId);
}

/**
 * Swaps order of an item with its immediate neighbor (up or down).
 */
export async function swapItemOrder(
  entity: OrderableEntityType,
  schoolId: string,
  itemId: string,
  direction: "up" | "down"
) {
  const delegate: any = getDelegate(entity);
  await normalizeOrders(entity, schoolId);

  const items = await delegate.findMany({
    where: { schoolId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
  });

  const index = items.findIndex((it: any) => it.id === itemId);
  if (index === -1) return items;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const currentItem = items[index];
  const targetItem = items[targetIndex];

  // Swap their orderIndex
  const currentOrder = currentItem.orderIndex;
  const targetOrder = targetItem.orderIndex;

  await delegate.update({
    where: { id: currentItem.id },
    data: { orderIndex: targetOrder },
  });

  await delegate.update({
    where: { id: targetItem.id },
    data: { orderIndex: currentOrder },
  });

  return await delegate.findMany({
    where: { schoolId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
  });
}
