import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find({ userId: req.user._id });
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    userId: req.user._id,
    _id: productId,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const ProductData = await Product.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(ProductData);
};
