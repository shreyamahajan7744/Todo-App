import React from 'react';
import Loader from 'react-loader-spinner';




export default class Posts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then((data) => {
        this.setState({ todos: data, isLoading: false })
      })
      .catch(<Loader
        type="Circles"
        color="#00BFFF"
        height="100"
        width="100"
      />)
  }

  handleChange(todo) {
    const todos = this.state.todos
    let index = todos.indexOf(todo);
    todos[index].completed = !todo.completed
    this.setState({ todos: todos })
    this.handleSave(todo);
  }


  handleChangeInput(todo) {
    todo.changeInput = true;
    const todos = this.state.todos
    todo.title = event.target.value
    this.setState({ todos: todos })
  }

  handleSave() {
    this.setState({ isLoading: true }, () => console.log("before " + this.state.isLoading))

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        todos: this.state.todos,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json(this.setState({ isLoading: false })))
      .then(console.log('After ' + this.state.isLoading))
  }


  handleDelete(todo) {
    const todos = this.state.todos
    let index = todos.indexOf(todo);
    delete todos[index]
    this.setState({ todos: todos })
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        todos: this.state.todos,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json(this.setState({ isLoading: false })))
      .then(console.log('After ' + this.state.isLoading))
  }

  render() {
    const todos = this.state.todos
    return (
      this.state.isLoading ? <Loader style={{ color: 'red !important' }}
        type="TailSpin"
        color="#00BFFF"
        height="100"
        width="100"
        transform='scale(1)'
      >Loading...</Loader> :
        <div className="container">
          <div className="col-xs-12">
            <h5>Todos for {this.props.name}</h5 >
            {todos.map((todo) => (
              <div className="row card-cust" key={todo.id}>
                <div className="text-left col-1" >{todo.id}.</div>
                <div className="text-middle col-4"><input style={{width: '100%' }} type='text' name="todo" defaultValue={todo.title} onChange={() => { this.handleChangeInput(todo) }} /></div>
                <div className="text-left col-2"><button className="btn btn-secondary" disabled={!todo.changeInput} onClick={() => this.handleSave(todo)}>Save</button></div>
                <div className="text-left col-2">{todo.completed ? <span style={{ color: 'green' }}>Completed </span> : <span style={{ color: 'red' }}>Pending</span>}</div>
                <div className="text-left col-1"><input type='checkbox' checked={todo.completed} onChange={() => { this.handleChange(todo) }} /></div>
                <div className="text-right col-2"><button className="btn btn-primary" disabled={!todo.completed === true} onClick={() => this.handleDelete(todo)}>Delete</button></div>
              </div>
            ))}
          </div>
        </div>
    );
  }
}