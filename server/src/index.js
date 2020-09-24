import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
      greeting(name: String): String
  }
`);

const resolver = () => {
  const greeting = (args) => {
    return `Hello ${args.name}`;
  };

  return { greeting };
};

const executeQuery = async () => {
  const result = await graphql(
    schema,
    `
      {
        greeting(name: "John")
      }
    `,
    resolver()
  );
  console.log(result);
};

executeQuery();
