import request from 'supertest'
import app from '../../../app'
import db from '../../../db'
import {
  ResourceNotFoundException,
  UnauthenticatedException,
  ValidationException,
} from '../../../exceptions-and-responses'

const URL_BASE = '/api/v1/tasks'
const URL_SIGN_UP = '/api/v1/auth/sign-up'
const ADMIN_BASE = '/api/v1/admin'
const ADMIN_USER = ADMIN_BASE + '/users'

const user1 = {
  name: 'Test User',
  email: 'testuser3@taskie.com',
  password: '12345',
}
const user2 = {
  name: 'Test User',
  email: 'testuser4@taskie.com',
  password: '12345',
}

function createTask(token: string) {
  return request(app)
    .post(URL_BASE)
    .set('Authorization', 'bearer ' + token)
    .send({
      title: 'My Task',
      dueDate: new Date().toISOString(),
    })
}

describe('GET /tasks', () => {
  afterAll(() => {
    db.$disconnect()
  })
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 200 on success', async () => {
    const user1Response = await request(app).post(URL_SIGN_UP).send(user1)
    const user2Response = await request(app).post(URL_SIGN_UP).send(user2)

    await createTask(user1Response.body.payload)
    await createTask(user1Response.body.payload)

    await createTask(user2Response.body.payload)
    await createTask(user2Response.body.payload)
    await createTask(user2Response.body.payload)

    const res = await request(app)
      .get(URL_BASE)
      .set('Authorization', 'bearer ' + user1Response.body.payload)
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.body.payload).toHaveLength(2)
  })
})

describe('POST /tasks', () => {
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 401 when not authenticated', async () => {
    const res = await request(app).post(URL_BASE).send({})
    expect(res.statusCode).toEqual(401)
    expect(res.body.errorMessage).toEqual(UnauthenticatedException.message)
  })

  it('returns 400 when bad validation', async () => {
    const userResponse = await request(app).post(URL_SIGN_UP).send(user1)

    await request(app)
      .post(URL_BASE)
      .set('Authorization', 'bearer ' + userResponse.body.payload)
      .send({})
      .then((res) => {
        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual(ValidationException.message)
      })
  })

  it('returns 201 on success', async () => {
    const userResponse = await request(app).post(URL_SIGN_UP).send(user1)

    await request(app)
      .post(URL_BASE)
      .set('Authorization', 'bearer ' + userResponse.body.payload)
      .send({
        title: 'My Task',
        dueDate: new Date().toISOString(),
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201)
        expect(res.body.payload).toHaveProperty('title', 'My Task')
      })
  })
})

describe('DELETE /tasks/:id', () => {
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 200 on success', async () => {
    const userResponse = await request(app).post(URL_SIGN_UP).send(user1)
    const taskResponse = await createTask(userResponse.body.payload)

    await request(app)
      .delete(URL_BASE + '/' + taskResponse.body.payload.id)
      .set('Authorization', 'bearer ' + userResponse.body.payload)
      .send()
      .then((res) => {
        expect(res.statusCode).toEqual(200)
      })
  })

  it('returns not found on deleting non exsiting task', async () => {
    const userResponse = await request(app).post(URL_SIGN_UP).send(user1)

    await request(app)
      .delete(URL_BASE + '/' + 455574)
      .set('Authorization', 'bearer ' + userResponse.body.payload)
      .send()
      .then((res) => {
        expect(res.body.errorMessage).toEqual(ResourceNotFoundException.message)
      })
  })
})

describe('PUT /tasks/:id', () => {
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 200 on success', async () => {
    const userResponse = await request(app).post(URL_SIGN_UP).send(user1)
    const taskResponse = await createTask(userResponse.body.payload)

    await request(app)
      .put(URL_BASE + '/' + taskResponse.body.payload.id)
      .set('Authorization', 'bearer ' + userResponse.body.payload)
      .send({ ...taskResponse.body.payload, completed: true })
      .then((res) => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.payload).toHaveProperty("completed", true)
      })
  })
})
