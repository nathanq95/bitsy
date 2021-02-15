# bitsy
> A web application designed to help users develop habits by breaking them down into smaller, manageable steps.

## Table of Contents

1. [Requirements](#requirements)
1. [Usage](#usage)
1. [API](#api)
1. [Development](#development)

## Requirements

- Node.js
- PostgreSQL
- Memcached

## Usage

1. Clone this repo and go to its root directory.
1. Run `npm install` to install its dependencies.

## API

- POST
    - /api/add
        - Creates new entries in the habits, progress, & details table using the data provided in the request body.  
        - Request body must contain habit_1, habit_2, habit_3, habit_4, day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4
            - Data types: string, string, string, string, boolean, boolean, boolean, boolean, boolean, boolean, boolean, string, string, string, string

- GET
    - /api/today
        - Returns habits scheduled for the current day
    - /api/overview
        - Returns the overall plan to achive goal habit
        - Request body must contain the id of the habit

- UPDATE
    - /api/complete
        - Completes habit for the currrent day
        - Request body must contain the id of the habit
    - /api/undo
        - Reverts habit for the current day to incomplete
        - Request body must contain the id of the habit
    - /api/update
        - Updates the details and/or scheduled days/times for a given habit
        - Request body must contain the id of the habit, followed by any updated data

- DELETE
    - /api/delete
        - Deletes all entries related to a given habit
        - Request body must contain the id of the habit
        
#### Currently Developed using...
- Node v10.15.3
- npm v6.4.1
- PostgreSQL v13.1
- Memcached v1.6.9

### Dependencies
- Express
- React
- node-postgres
- memcached

### Development Dependencies
- Webpack/babel
- Jest/chai/Supertest
- ESLint w/ Airbrb Style Guide

Refer to package.json file in the root directory for dependency version numbers.
