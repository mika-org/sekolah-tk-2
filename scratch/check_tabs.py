import re

with open('src/app/admin/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

tabs = sorted(list(set(re.findall(r"activeTab\s*===?\s*['\"]([^'\"]+)['\"]", text))))
print("Found tabs:", len(tabs))
for t in tabs:
    print(" -", t)
