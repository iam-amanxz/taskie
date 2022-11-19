import app from '../../../app'
import request from 'supertest'
import {
  InvalidCredentialsException,
  ValidationException,
} from '../../../exceptions-and-responses'

const URL_BASE = '/api/v1/auth'
const URL_SIGN_UP = URL_BASE + '/sign-up'
const URL_SIGN_IN = URL_BASE + '/sign-in'
const ADMIN_BASE = '/api/v1/admin'
const ADMIN_USER = ADMIN_BASE + '/users'

const user = {
  name: 'Test User',
  email: 'testuser3@taskie.com',
  password: '12345',
}                                                                                                                                                                                                                                                                   

describe('POST /sign-up', () => {
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 400 when validation fails', async () => {
    const res = await request(app).post(URL_SIGN_UP).send({})
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorMessage).toEqual(ValidationException.message)
  })

  it('returns 201 when success', async () => {
    const res = await request(app).post(URL_SIGN_UP).send(user)
    expect(res.statusCode).toEqual(201)
  })

  it('returns 409 if email already exists', async () => {
    await request(app).post(URL_SIGN_UP).send(user)
    const res = await request(app).post(URL_SIGN_UP).send(user)
    expect(res.statusCode).toEqual(409)
  })
})

describe('POST /sign-in', () => {
  beforeEach(async () => {
    await request(app).delete(ADMIN_USER).send({ secretKey: 'ADMINSECRETKEY' })
  })

  it('returns 400 when validation fails', async () => {
    const res = await request(app).post(URL_SIGN_IN).send({})
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorMessage).toEqual(ValidationException.message)
  })

  it('returns 200 when success', async () => {
    await request(app).post(URL_SIGN_UP).send(user)
    const res = await request(app).post(URL_SIGN_IN).send(user)
    expect(res.statusCode).toEqual(200)
  })

  it('returns 409 when auth fails', async () => {
    await request(app).post(URL_SIGN_UP).send(user)
    const res = await request(app)
      .post(URL_SIGN_IN)
      .send({ ...user, password: 'bbbbb' })
    expect(res.body.errorMessage).toEqual(InvalidCredentialsException.message)
  })
})
