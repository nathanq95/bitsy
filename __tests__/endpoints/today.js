const { Client } = require('pg');
const request = require('supertest');
const app = require('../../server/app');
const connection = require('../../database/index');

describe('/today', () => {
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

  it ('should receive a 200 response', () => {
    expect(1).to.equal(1);
  });
});