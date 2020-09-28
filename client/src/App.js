import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvier } from "react-apollo";
import Cars from "./Cars";
import CarsTwo from "./CarsTwo";

const client = new ApolloClient({
  uri: "http://localhost:4000",
});

function App() {
  return (
    <div>
      <ApolloProvier client={client}>
        <Cars />
        <CarsTwo />
      </ApolloProvier>
    </div>
  );
}

export default App;
