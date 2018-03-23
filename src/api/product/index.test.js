import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Product } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, product

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  product = await Product.create({})
})

test('POST /products 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', shortDescription: 'test', category: 'test', images: 'test', priceExcludedTax: 'test', taxRate: 'test', sku: 'test', quantity: 'test', width: 'test', height: 'test', depth: 'test', weight: 'test', shipFee: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.shortDescription).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.priceExcludedTax).toEqual('test')
  expect(body.taxRate).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(body.width).toEqual('test')
  expect(body.height).toEqual('test')
  expect(body.depth).toEqual('test')
  expect(body.weight).toEqual('test')
  expect(body.shipFee).toEqual('test')
})

test('POST /products 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /products 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /products 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /products/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${product.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
})

test('GET /products/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /products/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', shortDescription: 'test', category: 'test', images: 'test', priceExcludedTax: 'test', taxRate: 'test', sku: 'test', quantity: 'test', width: 'test', height: 'test', depth: 'test', weight: 'test', shipFee: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.shortDescription).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.priceExcludedTax).toEqual('test')
  expect(body.taxRate).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(body.width).toEqual('test')
  expect(body.height).toEqual('test')
  expect(body.depth).toEqual('test')
  expect(body.weight).toEqual('test')
  expect(body.shipFee).toEqual('test')
})

test('PUT /products/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /products/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('PUT /products/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', shortDescription: 'test', category: 'test', images: 'test', priceExcludedTax: 'test', taxRate: 'test', sku: 'test', quantity: 'test', width: 'test', height: 'test', depth: 'test', weight: 'test', shipFee: 'test' })
  expect(status).toBe(404)
})

test('DELETE /products/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /products/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /products/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('DELETE /products/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
