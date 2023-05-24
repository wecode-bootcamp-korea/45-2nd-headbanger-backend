-- migrate:up
ALTER TABLE wishlists ADD UNIQUE KEY (user_id, camp_id);

-- migrate:down

