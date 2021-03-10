const request = require('supertest');
const app = require('../../server/app');
const client = require('../../database/index');

describe('/today', () => {

  afterEach( async () => {
    await client.query('DELETE FROM details WHERE id >= 0');
    await client.query('DELETE FROM progress WHERE id >= 0');
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE details_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE progress_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1;');
  });

  afterAll( async () => {
    await client.end((err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  it ('should receive a 200 response if data exists for the current day', async (done) => {
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
      time_1: '16:00',
      time_2: '17:00',
      time_3: '18:00',
      time_4: '19:00'
    };

    await client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);
    await client.query('INSERT INTO progress(completed) VALUES(false)');
    await client.query(`INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('${data.day_0}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);

    request(app)
      .get('/api/today')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } 

        return done();
      });
  });

  it ('should receive a 204 response if data does not exist for the current day', async (done) => {

    request(app)
      .get('/api/today')
      .expect(204)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        return done();
      });
  });
});
