import React from "react";
import axios from "axios";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageUrl: "",
    };
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }
  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  delete(id) {
    axios.delete("/delete/" + id).then((data) => {
      location.reload();
    });
  }
  update(id) {
    axios.put("/up/" + id, this.state).then((data) => {
      location.reload();
    });
  }
  render() {
    return (
      <div>
        <img src={this.props.item.imageUrl} />
        <h2>{this.props.item.name}</h2>
        <h3> {this.props.item.description}</h3>
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
        <button
          onClick={() => {
            this.delete(this.props.item._id);
          }}
        >
          delete
        </button>
        <button
          onClick={() => {
            this.update(this.props.item._id);
          }}
        >
          update
        </button>
      </div>
    );
  }
}

export default ListItem;
