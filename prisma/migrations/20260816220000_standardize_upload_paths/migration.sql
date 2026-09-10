-- Keep gallery metadata aligned with the unified upload category.
ALTER TABLE "item_galeri"
  ALTER COLUMN "folder" SET DEFAULT 'gallery';

UPDATE "item_galeri"
SET "folder" = 'gallery'
WHERE "folder" = 'uploads';

-- Replace legacy uploaded copies of bundled program icons with stable assets.
UPDATE "program"
SET "url_ikon" = '/images/program_kindergarten.png'
WHERE "url_ikon" ~ '/[0-9]+_program_kindergarten\.png$';

UPDATE "program"
SET "url_ikon" = '/images/program_pre_kindergarten.png'
WHERE "url_ikon" = '/images/program_prekinder.png';

UPDATE "program"
SET "url_ikon" = '/images/program_kindergarten.png'
WHERE "url_ikon" = '/images/program_special.png';
