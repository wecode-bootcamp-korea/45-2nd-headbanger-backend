-- migrate:up
CREATE TABLE camps_amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    camp_id INT NOT NULL,
    amenity_id INT NOT NULL,
    FOREIGN KEY (camp_id) REFERENCES camps (id),
    FOREIGN KEY (amenity_id) REFERENCES amenities (id)
)

-- migrate:down
