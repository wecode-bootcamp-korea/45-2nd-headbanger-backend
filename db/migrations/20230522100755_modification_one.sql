-- migrate:up
ALTER TABLE users ADD COLUMN kakao_id VARCHAR(100) NULL AFTER email;
ALTER TABLE camps MODIFY COLUMN price decimal(12,2);
ALTER TABLE camps MODIFY COLUMN latitude decimal(12,2);
ALTER TABLE camps CHANGE longitute longitude decimal(12,2) AFTER latitude;

-- migrate:down

