CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    users_name VARCHAR(55) NOT NULL UNIQUE,
    users_password VARCHAR(55) NOT NULL
);

CREATE TABLE garage (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    garage_image VARCHAR(500),
    vehicle_name VARCHAR(50),
    CONSTRAINT fk_users
        FOREIGN KEY(users_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE TABLE record (
    id SERIAL PRIMARY KEY,
    garage_id INT NOT NULL,
    record_date date,
    mileage INT,
    service_note VARCHAR(500),
    CONSTRAINT fk_garage
        FOREIGN KEY(garage_id)
            REFERENCES garage(id)
);