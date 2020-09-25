import React from "react";
import ApolloClient from "apollo-boost";
import Provider from "./Provider";
import Cars from "./Cars";

const client = new ApolloClient({
  uri: "http://localhost:4000",
});

function App() {
  return (
    <div>
      <Provider client={client}>
        <Cars />
      </Provider>
    </div>
  );
}

export default App;
