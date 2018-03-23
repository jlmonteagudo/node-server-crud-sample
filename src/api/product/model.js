import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String
  },
  category: {
    type: String
  },
  images: {
    type: String
  },
  priceExcludedTax: {
    type: String
  },
  taxRate: {
    type: String
  },
  sku: {
    type: String
  },
  quantity: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  },
  depth: {
    type: String
  },
  weight: {
    type: String
  },
  shipFee: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      shortDescription: this.shortDescription,
      category: this.category,
      images: this.images,
      priceExcludedTax: this.priceExcludedTax,
      taxRate: this.taxRate,
      sku: this.sku,
      quantity: this.quantity,
      width: this.width,
      height: this.height,
      depth: this.depth,
      weight: this.weight,
      shipFee: this.shipFee,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
