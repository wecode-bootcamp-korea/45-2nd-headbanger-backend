-- migrate:up
ALTER TABLE reservations ADD COLUMN total_price DECIMAL(10,2) NOT NULL AFTER end_date;
ALTER TABLE reservations ADD COLUMN selected_zone VARCHAR(50) NOT NULL AFTER total_price;
ALTER TABLE reservations ADD COLUMN total_members INT NOT NULL AFTER selected_zone;
ALTER TABLE camps MODIFY COLUMN price DECIMAL(10,2);
ALTER TABLE camps MODIFY COLUMN latitude VARCHAR(30);
ALTER TABLE camps MODIFY COLUMN longitude VARCHAR(30); 
ALTER TABLE users MODIFY email VARCHAR(200) NULL;
ALTER TABLE users MODIFY password VARCHAR(200) NULL;
ALTER TABLE users MODIFY name VARCHAR(100) NULL;
ALTER TABLE users MODIFY phone_number VARCHAR(100) NULL;
ALTER TABLE users MODIFY theme_id INT NULL;
-- migrate:down

