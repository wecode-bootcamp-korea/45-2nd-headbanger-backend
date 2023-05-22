-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    view_score INT NOT NULL,
    safety_score INT NOT NULL,
    cost__score INT NOT NULL,
    clean_score INT NOT NULL,
    convenience_score INT NOT NULL,
    user_id INT NOT NULL,
    camp_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (camp_id) REFERENCES camps (id)
)

-- migrate:down
DROP TABLE reviews;
