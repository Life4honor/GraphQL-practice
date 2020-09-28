import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadData = this.loadData.bind(this);
  }

  async loadData(client) {
    const cars = await client.query({
      query: gql`
        {
          carsById(id: "1") {
            color
            brand
            parts {
              name
            }
          }
        }
      `,
    });
    this.setState({
      carsById: cars.data.carsById,
      loading: cars.loading,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>"Loading!"</div>;
    }
    return (
      <div>
        {this.state.carsById.brand ? (
          <div>{this.state.carsById.brand}</div>
        ) : null}
        <ApolloConsumer>
          {(client) => (
            <button onClick={() => this.loadData(client)}>Query</button>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}
export default Cars;
