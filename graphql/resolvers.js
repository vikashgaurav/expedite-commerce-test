const { createProduct, getProduct, updateProduct, deleteProduct } = require('../handlers/productHandlers');

const resolvers = {
  Query: {
    getProduct: (_, { ProductId }) => getProduct(ProductId),
  },
  Mutation: {
    createProduct: (_, args) => createProduct(args),
    updateProduct: (_, args) => updateProduct(args.ProductId, args),
    deleteProduct: (_, { ProductId }) => deleteProduct(ProductId),
  },
};

module.exports = resolvers;
