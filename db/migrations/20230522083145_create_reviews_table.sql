-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    view_score FLOAT NOT NULL,
    safety_score FLOAT NOT NULL,
    cost__score FLOAT NOT NULL,
    clean_score FLOAT NOT NULL,
    convenience_score FLOAT NOT NULL,
    user_id INT NOT NULL,
    camp_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (camp_id) REFERENCES camps (id)
)

-- migrate:down
DROP TABLE reviews;
