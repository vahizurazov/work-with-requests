import React, { Component } from "react";
// import ResultsTable from "./components/ResultsTable";
// import Loader from "./assets/images/loader.gif";
import Pagination from "./components/Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    var data = [...Array(150).keys()].map(i => ({
      id: i + 1,
      name: "Item " + (i + 1)
    }));
    this.state = {
      data: data,
      pageOfItems: [],
      isLoading: false
    };
    this.onChangePage = this.onChangePage.bind(this);
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  // componentDidMount() {
  //   const urlApi = "https://jsonplaceholder.typicode.com/";
  //   this.setState({ isLoading: true });
  //   fetch(urlApi + "posts")
  //     .then(response => response.json())
  //     .then(data => this.setState({ data, isLoading: false }))
  //     .catch("ERROR");
  // }

  render() {
    const { data, pageOfItems } = this.state;
    // console.log("data", data);

    return (
      <div className="App">
        <header className="container" id="container1">
          <div className="container">
            <div className="text-center">
              <ul>
                {pageOfItems.map(item => (
                  <li key={item.id}>
                    <p>
                      <strong>Title: </strong>
                      {item.name}
                    </p>
                    {/* <p>
                    <strong>Body:</strong> {item.body}
                  </p> */}
                  </li>
                ))}
              </ul>
              <Pagination items={data} onChangePage={this.onChangePage} />
            </div>
          </div>
        </header>
        {/* {isLoading ? (
          <div className="wrap-loader  container">
            <img src={Loader} alt="Loading..." />
          </div>
        ) : (
          <ResultsTable results={data} />
        )} */}
      </div>
    );
  }
}

export default App;
