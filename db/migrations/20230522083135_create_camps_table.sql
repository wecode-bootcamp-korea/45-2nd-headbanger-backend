-- migrate:up
CREATE TABLE camps (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    camp VARCHAR(200) NOT NULL,
    price DECIMAL NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    description TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    picture TEXT NOT NULL,
    view_map TEXT NOT NULL,
    region_id INT NOT NULL,
    theme_id INT NOT NULL,
    camping_zone_id INT NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions (id),
    FOREIGN KEY (theme_id) REFERENCES themes (id),
    FOREIGN KEY (camping_zone_id) REFERENCES camping_zones (id)
)

-- migrate:down
DROP TABLE camps;
