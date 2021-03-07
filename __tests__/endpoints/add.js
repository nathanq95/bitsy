const { Client } = require('pg');
const request = require('supertest');
const app = require('../../server/app');
const connection = require('../../database/index');

describe ('/add', () => {
  const client = new Client({
    database: 'habits_dev',
    host: 'localhost',
  });
  
  beforeAll( async () => {
    await client.connect((err) => {
      if (err) {
        console.log('Error connecting to the database: ', err);
      }
    });
  });

  afterAll( async () => {
    await client.query('DELETE FROM details WHERE id >= 0');
    await client.query('DELETE FROM progress WHERE id >= 0');
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE details_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE progress_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1;');
    await client.end((err) => {
      if (err) {
        console.log(err);
      }
    });
    await connection.end((err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  it ('should receive a 201 response when sending all required data', (done) => {
    const expectedText = 'OK';

    const data = {
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '18:00',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      };
      
    request(app)
      .post('/api/add')
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        } 
        expect(res.text).to.equal(expectedText);
        return done();
      });
    done();
  });

  it ('should receive a 400 response when missing some required value(s)', (done) => {
    const expectedText = 'Missing required value(s)';

    request(app)
      .post('/api/add')
      .send({
        habit_1: 'a',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '18:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        } 
        expect(res.text).to.equal(expectedText);
        return done();
      });
  });

  it ('should receive a 400 response if a habit value is not a string', (done) => {
    const expectedText = 'INVALID DATA TYPE';

    request(app)
      .post('/api/add')
      .send({
        habit_1: 0,
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '18:00',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.equal(expectedText);
        return done();
      });
  });

  it ('should receive a 400 response if a day value is not a boolean', (done) => {
    const expectedText = 'INVALID DATA TYPE';

    request(app)
      .post('/api/add')
      .send({
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: 'true',
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '18:00',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.equal(expectedText);
        return done();
      });
  });

  it ('should receive a 400 response if a time value is not a string', (done) => {
    const expectedText = 'INVALID DATA TYPE';

    request(app)
      .post('/api/add')
      .send({
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: 1800,
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .expect(400)
      .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.text).to.equal(expectedText);
          return done();
      });
  });

  it ('should receive a 400 response if a time value does not have the format "HH:MM"', (done) => {
    const expectedText = 'INVALID TIME FORMAT';

    request(app)
      .post('/api/add')
      .send({
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '1800',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.equal(expectedText);
        return done();
      });
  });
});
