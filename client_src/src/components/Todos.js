import React, {
  Component
} from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

class Todos extends Component {

  constructor() {
    super();

    this.state = {
      todos: []
    }
  }

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    axios.get('http://localhost:3000/api/todos')
      .then(response => {
        this.setState({
          todos: response.data
        }, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }


  render() {
    const todoItems = this.state.todos.map((todo,i) => {
      return(
        <TodoItem key={todo.id} item={todo}/>
      )
    })
    return (
      <div>
          <h1>Todos</h1>
          <ul className="collection">
            {todoItems}
          </ul>
      </div>
    )
  }
}

export default Todos;
