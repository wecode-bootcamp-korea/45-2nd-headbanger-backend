-- migrate:up
CREATE TABLE zones_reservations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    camping_zone_id INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations (id),
    FOREIGN KEY (camping_zone_id) REFERENCES camping_zones (id)
)

-- migrate:down
DROP TABLE zones_reservations;
