import React, { Component } from "react";
// import Pagination from "./Pagination";

class ResultsTable extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const { results } = this.props;
    console.log("results", results);

    return (
      <>
        <div className="container">
          ХРЕНЬ!!!!
          {/* <div className="text-center">
            <ul>
              {this.state.pageOfItems.map(item => (
                <li key={item.id}>
                  <p>
                    <strong>Title: </strong>
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
            <Pagination items={results} onChangePage={this.onChangePage} />
          </div> */}
        </div>
      </>
    );
  }
}

export default ResultsTable;
