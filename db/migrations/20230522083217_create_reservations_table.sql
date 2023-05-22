-- migrate:up
CREATE TABLE reservations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reservation_number TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    user_id INT NOT NULL,
    camp_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (camp_id) REFERENCES camps (id)
)

-- migrate:down
DROP TABLE reservations;
