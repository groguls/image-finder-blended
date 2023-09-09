import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      this.setState(() => ({ todos }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  handelSubmit = value => {
    const newTodo = { id: nanoid(), text: value };
    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
  };

  handelDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    console.log('todos', this.state.todos);
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handelSubmit} />;
        <Grid>
          {todos.map((todo, indx) => {
            return (
              <GridItem key={todo.id}>
                <Todo
                  todo={todo}
                  index={indx + 1}
                  onDelete={this.handelDelete}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
