const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Product {
    ProductId: ID!
    Name: String!
    Description: String!
    Price: Float!
    Category: String!
    Stock: Int!
    CreatedAt: String!
    UpdatedAt: String!
  }

  type Query {
    getProduct(ProductId: ID!): Product
  }

  type Mutation {
    createProduct(Name: String!, Description: String!, Price: Float!, Category: String!, Stock: Int!): Product
    updateProduct(ProductId: ID!, Name: String, Description: String, Price: Float, Category: String, Stock: Int): Product
    deleteProduct(ProductId: ID!): String
  }
`;

module.exports = typeDefs;
