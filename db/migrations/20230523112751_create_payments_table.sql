-- migrate:up
CREATE TABLE payments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    payment_number VARCHAR(200) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
)

-- migrate:down
DROP TABLE payments;
