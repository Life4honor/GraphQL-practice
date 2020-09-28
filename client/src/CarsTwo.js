import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadData = this.loadData.bind(this);
  }

  async loadData(id) {
    const cars = await this.props.client.query({
      query: gql`
        query CarsById($id: ID!) {
          carsById(id: $id) {
            color
            brand
            parts {
              name
            }
          }
        }
      `,
      variables: id,
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
        <button onClick={() => this.loadData({ id: "1" })}>Query</button>
      </div>
    );
  }
}
export default withApollo(Cars);
