-- migrate:up
CREATE TABLE regions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE regions;
