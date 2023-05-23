-- migrate:up
CREATE TABLE reservations_payments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    payment_id INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations (id),
    FOREIGN KEY (payment_id) REFERENCES payments (id)
)

-- migrate:down
DROP TABLE reservations_payments;
