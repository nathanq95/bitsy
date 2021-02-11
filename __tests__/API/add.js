const request = require('supertest');
const app = require('../../server/app');

describe ('POST /add', () => {
  it ('should send a POST request', async (done) => {
    request(app)
      .post('/api/add')
      .send({
        habit_1: 'a',
        habit_2: 'b',
        habit_3: 'c',
        habit_4: 'd',
        day_0: true,
        day_1: false,
        day_2: false,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: false,
        time_1: '18:00',
        time_2: '20:00',
        time_3: '21:00',
        time_4: '07:00'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
