const request = require('supertest');
const app = require('../../server/app');
const client = require('../../database/index');

describe ('/add', () => {

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
  });

  it ('should receive a 400 response when missing some required value(s)', (done) => {
    const expectedText = 'Missing required value(s)';
    const data = {
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
    };

    request(app)
      .post('/api/add')
      .send(data)
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
    const data = {
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
    };

    request(app)
      .post('/api/add')
      .send(data)
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
    const data = {
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
    };

    request(app)
      .post('/api/add')
      .send(data)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.text).to.equal(expectedText);
        return done();
      });
  });
    
    it ('should receive a 400 response if all day values are false', (done) => {
      const expectedText = 'Atleast one day must be true';
      const data = {
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: false,
        day_1: false,
        day_2: false,
        day_3: false,
        day_4: false,
        day_5: false,
        day_6: false,
        time_1: '18:00',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      };
  
      request(app)
        .post('/api/add')
        .send(data)
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
      time_1: 1800,
      time_2: '20:00',
      time_3: '21:00',
      time_4: '07:00'
    };

    request(app)
      .post('/api/add')
      .send(data)
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
      time_1: '1800',
      time_2: '20:00',
      time_3: '21:00',
      time_4: '07:00'
    };

    request(app)
      .post('/api/add')
      .send(data)
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
