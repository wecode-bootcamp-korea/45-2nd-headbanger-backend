-- migrate:up
ALTER TABLE camping_zones 
    ADD COLUMN x1 INT NOT NULL AFTER zone_name,
    ADD COLUMN x2 INT NOT NULL AFTER x1,
    ADD COLUMN x3 INT NOT NULL AFTER x2,
    ADD COLUMN x4 INT NOT NULL AFTER x3,
    ADD COLUMN y1 INT NOT NULL AFTER x4,
    ADD COLUMN y2 INT NOT NULL AFTER y1,
    ADD COLUMN y3 INT NOT NULL AFTER y2,
    ADD COLUMN y4 INT NOT NULL AFTER y3;

-- migrate:down

