-- migrate:up
CREATE TABLE amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amenity VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE amenities;
