-- migrate:up
ALTER TABLE payments 
  DROP COLUMN payment_number,
  DROP COLUMN total_price,
  ADD COLUMN payment_data JSON NOT NULL AFTER id,
  ADD COLUMN reservation_id INT NOT NULL AFTER payment_data,
  ADD FOREIGN KEY(reservation_id) REFERENCES reservations(id);
DROP TABLE reservations_payments;
ALTER TABLE reservations DROP COLUMN selected_zone;
ALTER TABLE reviews RENAME COLUMN cost__score TO cost_score;
-- migrate:down

