import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import axios from 'axios';

class TodoDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: ''
    }
  }

  componentWillMount() {
		this.getTodos();
  }

  getTodos() {
    let todoId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/todos/${todoId}`)
      .then(response => {
        this.setState({
          details: response.data
        }, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let todoId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/todos/${todoId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }


    render() {
      return (
        <div>
          <br />
          <Link className="btn grey" to="/">Back</Link>
          <h1> {this.state.details.name} </h1>
          <ul className="collection">
			      <li className="collection-item">Completed: {this.state.details.completed}</li>
			      <li className="collection-item">Date: {this.state.details.date}</li>
          </ul>
		      <ul>
			      <Link className="btn" to={`/todos/edit/${this.state.details.id}`}> EDIT </Link>

			      <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
		      </ul>
        </div>
      );
    }
}

export default TodoDetails;
