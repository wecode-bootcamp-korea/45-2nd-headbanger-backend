-- migrate:up
CREATE TABLE head_counts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    head_count VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE head_counts;
