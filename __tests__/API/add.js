const { Client } = require('pg');
const request = require('supertest');
const app = require('../../server/app');

describe (' /add', () => {
  const client = new Client({
    database: 'habits_dev',
    host: 'localhost',
  });

  client.connect((err) => {
    if (err) {
      console.log('Error connecting to the database: ', err);
    }
  });

  beforeEach( async (done) => {
    await client.query('ALTER SEQUENCE details_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE progress_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1;');
    
    done();
  });

  afterEach( async (done) => {
    await client.query('DELETE FROM details WHERE id >= 0');
    await client.query('DELETE FROM progress WHERE id >= 0');
    await client.query('DELETE FROM habits WHERE id >= 0');

    done();
  });

  it ('should receive a 201 response when sending all required data', async (done) => {
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
      
    await request(app).post('/api/add').send(data).expect(201);
    const expected = data;
    let habits = await client.query('SELECT * FROM habits');
    let details = await client.query('SELECT * FROM details');
    const progress = await client.query('SELECT * FROM progress');
    const actualHabits = habits.rows[0];
    const actualDetails = details.rows[0];
    const actualProgress = progress.rows[0];

    expect(actualHabits.habit_1).to.equal(expected.habit_1);
    expect(actualHabits.habit_2).to.equal(expected.habit_2);
    expect(actualHabits.habit_3).to.equal(expected.habit_3);
    expect(actualHabits.habit_4).to.equal(expected.habit_4);
    expect(actualDetails.day_0).to.equal(expected.day_0);
    expect(actualDetails.day_1).to.equal(expected.day_1);
    expect(actualDetails.day_2).to.equal(expected.day_2);
    expect(actualDetails.day_3).to.equal(expected.day_3);
    expect(actualDetails.day_4).to.equal(expected.day_4);
    expect(actualDetails.day_5).to.equal(expected.day_5);
    expect(actualDetails.day_6).to.equal(expected.day_6);
    expect(actualDetails.time_1).to.equal(expected.time_1);
    expect(actualDetails.time_2).to.equal(expected.time_2);
    expect(actualDetails.time_3).to.equal(expected.time_3);
    expect(actualDetails.time_4).to.equal(expected.time_4);
    expect(actualProgress.completed).to.equal(false);
    expect(actualProgress.streak).to.equal(0);
    done();
  });

  it ('should receive a 400 response when missing some required value(s)', async (done) => {
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
        if (err) return done(err);
        return done();
      });
  });

  it ('should receive a 400 response if a habit value is not a string', async (done) => {
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
        if (err) return done(err);
        return done();
      });
  });

  it ('should receive a 400 response if a day value is not a boolean', async (done) => {
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
        if (err) return done(err);
        return done();
      });
  });

  it ('should receive a 400 response if a time value is not a string', async (done) => {
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
        if (err) return done(err);
        return done();
      });
  });

  it ('should receive a 400 response if a time value does not have the format "HH:MM"', async (done) => {
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
        if (err) return done(err);
        return done();
      });
  });
});
