/* eslint-disable no-else-return */
const mongoose = require('mongoose');

const { generateNameSlug } = require('../utils/slugify');

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    brandId: { type: String, unique: true },
    brandName: {
      type: String,
      required: [true, 'Please enter the product name!'],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroupProduct',
      required: [true, 'Group is belonging to product'],
    },
    groupName: {
      type: mongoose.Schema.Types.String,
      ref: 'GroupProduct',
      required: [true, 'Fill in the group first!'],
    },
    groupSlug: {
      type: mongoose.Schema.Types.String,
      ref: 'GroupProduct',
      required: [true, 'Group slug is belong to category'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CategoryProduct',
      required: [true, 'Category is belonging to product'],
    },
    categoryName: {
      type: mongoose.Schema.Types.String,
      ref: 'CategoryProduct',
      required: [true, 'Fill in the category first!'],
    },
    categorySlug: {
      type: mongoose.Schema.Types.String,
      ref: 'CategoryProduct',
      required: [true, 'Category slug must be in category!'],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategoryProduct',
      required: [true, 'Sub category is belonging to product'],
    },
    subCategoryName: {
      type: mongoose.Schema.Types.String,
      ref: 'SubCategoryProduct',
      required: [true, 'Fill in the sub-category first!'],
    },
    subCategorySlug: {
      type: mongoose.Schema.Types.String,
      ref: 'SubCategoryProduct',
      required: [true, 'Sub category slug must be in sub category!'],
    },
    typeProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
      required: [true, 'Type Product is belonging to product'],
    },
    typeProductName: {
      type: mongoose.Schema.Types.String,
      ref: 'ProductType',
      required: [true, 'Please enter the type of the product!'],
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VendorProduct',
      required: [true, 'Vendor is belonging to product'],
    },
    vendorName: {
      type: mongoose.Schema.Types.String,
      ref: 'VendorProduct',
      required: [true, 'Please select the vendor!'],
    },
    vendorSlug: {
      type: mongoose.Schema.Types.String,
      ref: 'VendorProduct',
      required: [true, 'Vendor slug must be in vendor!'],
    },
    purchaseDate: Date,
    quantity: {
      type: Number,
      required: [true, 'Please enter the numbers of product'],
    },
    eachPrice: {
      type: Number,
      required: [true, 'Please enter the product unit price!'],
    },
    currentLocation: {
      type: String,
      required: [true, 'Please enter the current location of the product!'],
    },
    conditionGood: {
      type: Number,
      required: [true, 'Please enter the condition of the products'],
    },
    conditionBad: {
      type: Number,
      required: [true, 'Please enter the condition of the products'],
    },
    productSlug: {
      type: String,
      index: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// pre hook
productSchema.pre('save', async function (next) {
  // code here
  const product = this;

  if (!product.isNew) {
    return next();
  }

  try {
    const count = await mongoose.models.Product.countDocuments();

    product.productId = (count + 1).toString().padStart(3, '0');

    next();
  } catch (error) {
    next(error);
  }
});

productSchema.pre('save', async function (next) {
  // code here
  const product = this;

  if (!product.isNew) {
    return next();
  }

  try {
    const count = await mongoose.models.Product.countDocuments();

    product.brandId = (count + 1).toString().padStart(2, '0');

    next();
  } catch (error) {
    next(error);
  }
});

productSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('groupName')) {
    this.groupSlug = generateNameSlug(this.groupName);
  }

  if (this.isNew || this.isModified('categoryName')) {
    this.categorySlug = generateNameSlug(this.categoryName);
  }

  if (this.isNew || this.isModified('subCategoryName')) {
    this.subCategorySlug = generateNameSlug(this.subCategoryName);
  }

  if (this.isNew || this.isModified('brandName')) {
    this.productSlug = generateNameSlug(this.brandName);
  }

  if (this.isNew || this.isModified('vendorName')) {
    this.vendorSlug = generateNameSlug(this.vendorName);
  }
  next();
});

// define virtual property
productSchema.virtual('productCondition').get(function () {
  if (this.conditionGood >= this.conditionBad) {
    return 'Good';
  } else {
    return 'Bad';
  }
});

productSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate('group').populate({
    path: 'group',
    select: 'groupId groupName groupSlug',
  });

  this.populate('category').populate({
    path: 'category',
    select: 'categoryId categoryName categorySlug',
  });

  this.populate('subCategory').populate({
    path: 'subCategory',
    select: 'subCategoryId subCategoryName subCategorySlug subCategoryImage',
  });

  this.populate('typeProduct').populate({
    path: 'typeProduct',
    select:
      'productTypeId type vendor eachPriceProductType currentLocationProductType',
  });

  this.populate('vendor').populate({
    path: 'vendor',
    select: 'vendorName vendorSlug',
  });

  next();
});

productSchema.index({ productSlug: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
