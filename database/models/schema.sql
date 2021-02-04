DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS details;
DROP TABLE IF EXISTS progress;

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    goal_habit varchar,
    prereq_habit_1 VARCHAR(50),
    prereq_habit_2 VARCHAR(50),
    prereq_habit_3 VARCHAR(50)
);

CREATE TABLE details (
    id SERIAL REFERENCES habits(id),
    current_habit VARCHAR(50),
    day_1 boolean,
    day_2 boolean,
    day_3 boolean,
    day_4 boolean,
    day_5 boolean,
    day_6 boolean,
    day_7 boolean,
    time_1 time,
    time_2 time,
    time_3 time,
    time_4 time
);

CREATE TABLE progress (
    id SERIAL REFERENCES habits(id),
    completed boolean,
    streak SMALLINT DEFAULT 0
);