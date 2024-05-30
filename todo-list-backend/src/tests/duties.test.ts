const request = require('supertest');
const { app } = require('../index');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'duties_db',
  password: 'root',
  port: 5432,
});

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

describe('Duties API', () => {
  it('should fetch all duties', async () => {
    const response = await request(app).get('/duties');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add a new duty', async () => {
    const response = await request(app)
      .post('/duties')
      .send({ name: 'New Duty' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'New Duty');
  });

  it('should update a duty', async () => {
    const addResponse = await request(app)
      .post('/duties')
      .send({ name: 'Duty to Update' });
    const { id } = addResponse.body;

    const response = await request(app)
      .put(`/duties/${id}`)
      .send({ name: 'Updated Duty' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Duty');
  });

  it('should delete a duty', async () => {
    const addResponse = await request(app)
      .post('/duties')
      .send({ name: 'Duty to Delete' });
    const { id } = addResponse.body;

    const response = await request(app)
      .delete(`/duties/${id}`);
    expect(response.status).toBe(204);
  });
});
