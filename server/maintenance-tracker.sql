CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    users_name VARCHAR(55) NOT NULL UNIQUE,
    users_password VARCHAR(55) NOT NULL
);

CREATE TABLE garage (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    garage_image VARCHAR(500),
    vehicle_name VARCHAR(50)
);

CREATE TABLE record (
    id SERIAL PRIMARY KEY,
    garage_id INT NOT NULL,
    record_date date,
    mileage INT,
    service_note VARCHAR(500)
);

ALTER TABLE "garage" ADD CONSTRAINT "garage_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("id");
ALTER TABLE "record" ADD CONSTRAINT "garage_fk0" FOREIGN KEY ("garage_id") REFERENCES "garage"("id");


-- then go to postgres in command and enter it in
-- 