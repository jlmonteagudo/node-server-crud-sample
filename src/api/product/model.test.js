import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', description: 'test', shortDescription: 'test', category: 'test', images: 'test', priceExcludedTax: 'test', taxRate: 'test', sku: 'test', quantity: 'test', width: 'test', height: 'test', depth: 'test', weight: 'test', shipFee: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.description).toBe(product.description)
    expect(view.shortDescription).toBe(product.shortDescription)
    expect(view.category).toBe(product.category)
    expect(view.images).toBe(product.images)
    expect(view.priceExcludedTax).toBe(product.priceExcludedTax)
    expect(view.taxRate).toBe(product.taxRate)
    expect(view.sku).toBe(product.sku)
    expect(view.quantity).toBe(product.quantity)
    expect(view.width).toBe(product.width)
    expect(view.height).toBe(product.height)
    expect(view.depth).toBe(product.depth)
    expect(view.weight).toBe(product.weight)
    expect(view.shipFee).toBe(product.shipFee)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.description).toBe(product.description)
    expect(view.shortDescription).toBe(product.shortDescription)
    expect(view.category).toBe(product.category)
    expect(view.images).toBe(product.images)
    expect(view.priceExcludedTax).toBe(product.priceExcludedTax)
    expect(view.taxRate).toBe(product.taxRate)
    expect(view.sku).toBe(product.sku)
    expect(view.quantity).toBe(product.quantity)
    expect(view.width).toBe(product.width)
    expect(view.height).toBe(product.height)
    expect(view.depth).toBe(product.depth)
    expect(view.weight).toBe(product.weight)
    expect(view.shipFee).toBe(product.shipFee)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
