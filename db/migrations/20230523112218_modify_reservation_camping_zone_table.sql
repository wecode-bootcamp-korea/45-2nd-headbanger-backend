-- migrate:up
ALTER TABLE camps DROP FOREIGN KEY camps_ibfk_3;
ALTER TABLE camps DROP COLUMN camping_zone_id;
ALTER TABLE camping_zones CHANGE camping_zone zone_name;
ALTER TABLE camping_zones CHANGE head_count_id zone_size_option_id;
ALTER TABLE camping_zones ADD COLUMN camp_id INT NOT NULL AFTER zone_size_option_id;
ALTER TABLE camping_zones ADD FOREIGN KEY(camp_id) REFERENCES camps(id);
ALTER TABLE head_counts RENAME zone_size_options;
ALTER TABLE zone_size_options ADD COLUMN additional_price DECIMAL(10,2) NOT NULL AFTER id;
ALTER TABLE zone_size_options CHANGE head_count max_people;
ALTER TABLE reservations ADD COLUMN reservation_status_id INT NOT NULL AFTER user_id;
ALTER TABLE reservations ADD FOREIGN KEY(reservation_status_id) REFERENCES reservation_status(id);
ALTER TABLE reservations DROP FOREIGN KEY reservations_ibfk_2;
ALTER TABLE reservations DROP COLUMN camp_id;
ALTER TABLE camps CHANGE camp campsite_name;
ALTER TABLE amenities CHANGE amenity amenity_name;
ALTER TABLE regions CHANGE region region_name;

-- migrate:down

