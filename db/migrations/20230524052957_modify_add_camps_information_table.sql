-- migrate:up
ALTER TABLE users DROP CONSTRAINT email;
ALTER TABLE camps 
    ADD COLUMN check_in VARCHAR(30) NOT NULL AFTER view_map,
    ADD COLUMN check_out VARCHAR(30) NOT NULL AFTER check_in;
-- migrate:down

