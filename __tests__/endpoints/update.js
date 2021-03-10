const request = require('supertest');
const app = require('../../server/app');
const client = require('../../database/index');

describe('/update', () => {

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

  it ('should receive a 201 response if data exists for the given id', async (done) => {
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
      time_1: '16:00',
      time_2: '17:00',
      time_3: '18:00',
      time_4: '19:00'
    };
  
    await client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);
    await client.query('INSERT INTO progress(completed) VALUES(false)');
    await client.query(`INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('${data.day_0}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);

    request(app)
      .patch('/api/update')
      .send({id: 1})
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.text).to.equal(expectedText);
        return done();
      });
  });

  it ('should only update given values', async (done) => {
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
    const updatedData = {
      id: 1,
      habit_1: 'c',
      day_1: false,
      time_1: '17:00',
    };
    let updatedHabitValues;
    let updatedDetailsValues;
  
    await client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);
    await client.query('INSERT INTO progress(completed) VALUES(false)');
    await client.query(`INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('${data.day_0}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);

    request(app)
      .patch('/api/update')
      .send(updatedData)
      .expect(201)
      .end( async (err, res) => {
        if (err) {
          return done(err)
        }

        updatedHabitValues = await client.query('SELECT * FROM habits WHERE id = 1');
        updatedDetailsValues = await client.query('SELECT * FROM details WHERE id = 1');

        expect(updatedHabitValues.rows[0].habit_1).to.equal(updatedData.habit_1);
        expect(updatedHabitValues.rows[0].habit_2).to.equal(data.habit_2);
        expect(updatedDetailsValues.rows[0].day_1).to.equal(updatedData.day_1);
        expect(updatedDetailsValues.rows[0].day_2).to.equal(data.day_2);
        expect(updatedDetailsValues.rows[0].time_1).to.equal(updatedData.time_1);
        expect(updatedDetailsValues.rows[0].time_2).to.equal(data.time_2);
        return done();
      });
  });

  it ('should receive a 400 response if id is not a number', async (done) => {
    const expectedText = 'INVALID DATA TYPE';

    request(app)
      .patch('/api/update')
      .send({id: '1'})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        } 

        expect(res.text).to.equal(expectedText);
        return done();
      });
  });

  it ('should receive a 400 response if id is undefined', async (done) => {
    const expectedText = 'MISSING id IN REQUEST BODY';

    request(app)
      .patch('/api/update')
      .send({})
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
