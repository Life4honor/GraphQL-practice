import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
      message: String
  }
`);

const resolver = () => {
  const message = () => {
    return "Hello world";
  };

  return { message };
};

const executeQuery = async () => {
  const result = await graphql(schema, "{ message }", resolver());
  console.log(result.data);
};

executeQuery();
