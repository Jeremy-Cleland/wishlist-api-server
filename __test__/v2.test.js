'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

let testAdmin;

beforeAll(async () => {
  await db.sync();
  testAdmin = await users.create({
    username: 'testyAdmin',
    password: 'pass123',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
});

/**  for Bearer Auth we must create the following headers, we'll do so in supertest with the .set() method
* headers: {
*  Authorization: Bearer <some-token>
* }
*/

describe('v2 Routes', () => {
  it('creates a record', async() => {
    let response = await request.post('/api/v2/wishlist').send({
      product: 'Gameboy',
      qty: 1,
      price: 100,
      priority: 'medium',
      userId: 1,
    }).set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(201);
    expect(response.body.product).toEqual('Gameboy');
  });

  it('gets all records with userID', async() => {
    let response = await request.get('/api/v2/wishlist/1').set('Authorization', `Bearer ${testAdmin.token}`);
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].product).toEqual('Gameboy');
  });


  it('updates a record', async() => {
    let response = await request.put('/api/v2/wishlist/1').send({
      product: 'Gameboy',
      qty: 2,
      price: 200,
      priority: 'medium',
      userId: 1,
    }).set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.qty).toEqual(2);
    expect(response.body.price).toEqual(200);
  });

  it('deletes a record', async() => {
    let response = await request.delete('/api/v2/wishlist/1').set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

}); 