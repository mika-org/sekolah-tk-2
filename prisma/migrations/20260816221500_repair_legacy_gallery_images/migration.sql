-- The original files behind these legacy URLs are no longer available.
-- Point the two affected gallery rows at bundled, durable replacements.
UPDATE "item_galeri"
SET "url_gambar" = '/images/gallery1.png'
WHERE "url_gambar" LIKE '%/1785425495929_1000521323.jpg';

UPDATE "item_galeri"
SET "url_gambar" = '/images/gallery2.png'
WHERE "url_gambar" LIKE '%/1785472363846_1000643056.jpg';
