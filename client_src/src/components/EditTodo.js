import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import axios from 'axios';

class EditTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      completed: '',
      date: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getTodoDetails();
  }

  getTodoDetails() {
    let todoId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/todos/${todoId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          completed: response.data.completed,
          date: response.data.date
        }, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }

  editTodo(newTodo) {
    axios.request({
			method: 'put',
			url: `http://localhost:3000/api/todos/${this.state.id}`,
			data: newTodo
		}).then(response => {
			this.props.history.push('/');
		}).catch(err => console.log(err));
  }
  onSubmit(e) {
		const newTodo = {
			name: this.refs.name.value,
			completed: false,
			date: new Date()
		}
		this.editTodo(newTodo);
		e.preventDefault();
	}


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


    render() {
      return (
        <div>
          <br />
          <Link className="btn grey" to="/">Back</Link>
          <h1>Edit todo</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="input-field">
              <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange}/>
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field">
              <input type="text" name="completed" ref="completed" value={this.state.completed}/>
              <label htmlFor="completed">Completed</label>
            </div>
            <div className="input-field">
              <input type="text" name="date" ref="date" value={this.state.date}/>
              <label htmlFor="date">Date</label>
            </div>
			<input type="submit" value="save" className="btn" />
          </form>
        </div>
      );
    }
}

export default EditTodo;
