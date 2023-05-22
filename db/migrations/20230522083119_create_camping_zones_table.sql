-- migrate:up
CREATE TABLE camping_zones (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    camping_zone VARCHAR(100) NOT NULL,
    head_count_id INT NOT NULL,
    FOREIGN KEY (head_count_id) REFERENCES head_counts (id)
)

-- migrate:down
DROP TABLE camping_zones;
