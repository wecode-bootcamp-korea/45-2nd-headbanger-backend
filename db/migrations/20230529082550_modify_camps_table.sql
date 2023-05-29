-- migrate:up
ALTER TABLE camps DROP COLUMN picture;
ALTER TABLE zone_size_options MODIFY max_people INT

-- migrate:down
