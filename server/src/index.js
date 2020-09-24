import { graphql, buildSchema } from "graphql";

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

const schema = buildSchema(`
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

const resolver = () => {
  const carsByType = (args) => {
    return db.cars.filter((car) => car.type === args.type);
  };
  const carsById = (args) => {
    return db.cars.filter((car) => car.id === args.id)[0];
  };
  const insertCar = ({ brand, color, doors, type }) => {
    db.cars.push({
      id: Math.random().toString(),
      brand: brand,
      color: color,
      doors: doors,
      type: type,
    });
    return db.cars;
  };
  return { carsByType, carsById, insertCar };
};

const executeQuery = async () => {
  const queryByType = `
  query carsByType($type: CarTypes!){
    carsByType(type: $type){
      brand
      color
      type
      id
    }
  }`;

  const queryByID = `
  query carsById($id: ID!){
    carsById(id: $id){
      brand
      type
      color
      id
    }
  }`;

  const mutation = `
  mutation insertCar($brand: String!, $color: String!, $doors: Int!, $type: CarTypes!){
    insertCar(brand: $brand, color: $color, doors:$doors, type: $type){
      brand
      color
      id
      type
    }
  }
  `;

  const responseByType = await graphql(schema, queryByType, resolver(), null, {
    type: "SUV",
  });
  console.log("responseByType -", responseByType.data);

  const responseById = await graphql(schema, queryByID, resolver(), null, {
    id: "a",
  });
  console.log("responseById -", responseById.data);

  const res = await graphql(schema, mutation, resolver(), null, {
    brand: "Nissan",
    color: "red",
    doors: 4,
    type: "SUV",
  });
  console.log("insertCar -", res.data);
};

executeQuery();
