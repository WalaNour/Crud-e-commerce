import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      description: "",
      imageUrl: "",
    };
  }

  componentDidMount() {
    $.ajax({
      url: "/items",
      success: (data) => {
        this.setState({
          items: data,
        });
      },
      error: (err) => {
        console.log("err", err);
      },
    });
  }

  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  create() {
    axios.post("/add", this.state).then((data) => {
      this.componentDidMount();
    });
  }
  render() {
    return (
      <div>
        <h1>Item List</h1>
        <input
          type="text"
          name="name"
          onChange={this.handlechange.bind(this)}
        />
        <input
          type="text"
          name="description"
          onChange={this.handlechange.bind(this)}
        />
        <input
          type="text"
          name="imageUrl"
          onChange={this.handlechange.bind(this)}
        />
        <button onClick={this.create.bind(this)}>add product</button>
        <List items={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
