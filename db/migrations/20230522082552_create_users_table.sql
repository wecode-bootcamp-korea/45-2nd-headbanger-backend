-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    kakao_id BIGINT NULL,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    profile_image TEXT NULL,
    phone_number VARCHAR(100) NOT NULL,
    points DECIMAL(10,2) NULL,
    theme_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (theme_id) REFERENCES themes (id)
)

-- migrate:down
DROP TABLE users;
