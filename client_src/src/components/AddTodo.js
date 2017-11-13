import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import axios from 'axios';

class AddTodo extends Component {

	addTodo(newTodo) {
		axios.request({
			method: 'post',
			url: 'http://localhost:3000/api/todos',
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
		this.addTodo(newTodo);
		e.preventDefault();
	}


    render() {
      return (
        <div>
          <br />
          <Link className="btn grey" to="/">Back</Link>
          <h1>Add todo</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="input-field">
              <input type="text" name="name" ref="name" />
              <label htmlFor="name">Name</label>
            </div>
			<input type="submit" value="save" className="btn" />
          </form>
        </div>
      );
    }
}

export default AddTodo;
