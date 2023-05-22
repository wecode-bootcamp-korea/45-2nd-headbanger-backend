-- migrate:up
CREATE TABLE environments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    environment VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE environments;
