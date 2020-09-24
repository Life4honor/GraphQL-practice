import { ApolloServer, gql } from "apollo-server";

const db = {
  cars: [
    {
      id: "a",
      brand: "Ford",
      color: "Blue",
      doors: 4,
      type: "Sedan",
    },
    {
      id: "b",
      brand: "Tesla",
      color: "Red",
      doors: 4,
      type: "SUV",
    },
    {
      id: "c",
      brand: "Toyota",
      color: "White",
      doors: 4,
      type: "Coupe",
    },
  ],
};

const schema = gql(`
  enum CarTypes {
    Sedan
    SUV
    Coupe
  }
  type Car {
      id: ID!
      brand: String! 
      color: String!
      doors: Int!
      type: CarTypes!
  }
  type Query {
    carsByType(type: CarTypes!): [Car]
    carsById(id:ID!): Car
  }
  type Mutation {
    insertCar(brand: String!, color: String!, doors: Int!, type: CarTypes!): [Car]!
  }
`);

const resolvers = {
  Query: {
    carsByType: (parent, args, context, info) => {
      return context.db.cars.filter((car) => car.type === args.type);
    },
    carsById: (parent, args, context, info) => {
      return context.db.cars.filter((car) => car.id === args.id)[0];
    },
  },
  Car: {
    brand: (parent, args, context, info) => {
      return db.cars.filter((car) => car.brand === parent.brand)[0].brand;
    },
  },
  Mutation: {
    insertCar: (_, { brand, color, doors, type }) => {
      context.db.cars.push({
        id: Math.random().toString(),
        brand: brand,
        color: color,
        doors: doors,
        type: type,
      });
      return context.db.cars;
    },
  },
};

const dbConnection = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db);
    }, 2000);
  });
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => {
    return { db: await dbConnection() };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
