DROP TABLE IF EXISTS details;
DROP TABLE IF EXISTS progress;
DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    habit_1 VARCHAR(50),
    habit_2 VARCHAR(50),
    habit_3 VARCHAR(50),
    habit_4 varchar(50)
);

CREATE TABLE details (
    id SERIAL REFERENCES habits(id),
    current_habit SMALLINT DEFAULT 1,
    day_0 boolean,
    day_1 boolean,
    day_2 boolean,
    day_3 boolean,
    day_4 boolean,
    day_5 boolean,
    day_6 boolean,
    time_1 VARCHAR(7),
    time_2 VARCHAR(7),
    time_3 VARCHAR(7),
    time_4 VARCHAR(7)
);

CREATE TABLE progress (
    id SERIAL REFERENCES habits(id),
    completed boolean,
    streak SMALLINT DEFAULT 0
);