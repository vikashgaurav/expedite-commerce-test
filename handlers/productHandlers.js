const dynamoDb = require('./models/dynamoDb');
const { v4: uuidv4 } = require('uuid');

// Table Names
const PRODUCT_TABLE = 'Products';
const TAXONOMY_TABLE = 'ProductTaxonomyAttributes';

// Create Product
const createProduct = async (data) => {
  const timestamp = new Date().toISOString();
  const product = {
    ProductId: uuidv4(),
    ...data,
    CreatedAt: timestamp,
    UpdatedAt: timestamp,
  };

  const params = {
    TableName: PRODUCT_TABLE,
    Item: product,
  };

  await dynamoDb.put(params).promise();
  return product;
};

// Get Product
const getProduct = async (id) => {
  const params = {
    TableName: PRODUCT_TABLE,
    Key: { ProductId: id },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

// Update Product
const updateProduct = async (id, data) => {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: PRODUCT_TABLE,
    Key: { ProductId: id },
    UpdateExpression: 'set #n = :name, Description = :description, Price = :price, Category = :category, Stock = :stock, UpdatedAt = :updatedAt',
    ExpressionAttributeNames: { '#n': 'Name' },
    ExpressionAttributeValues: {
      ':name': data.Name,
      ':description': data.Description,
      ':price': data.Price,
      ':category': data.Category,
      ':stock': data.Stock,
      ':updatedAt': timestamp,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamoDb.update(params).promise();
  return result.Attributes;
};

// Delete Product
const deleteProduct = async (id) => {
  const params = {
    TableName: PRODUCT_TABLE,
    Key: { ProductId: id },
  };

  await dynamoDb.delete(params).promise();
  return { message: `Product ${id} deleted successfully` };
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };
