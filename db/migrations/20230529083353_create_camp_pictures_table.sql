-- migrate:up
CREATE TABLE camp_pictures (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    picture TEXT NOT NULL,
    camp_id INT NOT NULL,
    FOREIGN KEY (camp_id) REFERENCES camps (id)
)

-- migrate:down
DROP TABLE camp_pictures;
