/// <reference path="./interfaces.d.ts"/>
import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import checkAll from './assets/img/down-arrow.svg'
import * as ReactDOM from "react-dom";
import classNames from "classnames";

class App extends React.Component<ITodoAppProps, ITodoAppState> implements ITodoApp {
  public state: ITodoAppState;
  private isCheckAll = false;
  private newTodoRef = React.createRef<HTMLInputElement>()

  constructor(props: ITodoAppState) {
    super(props);
    this.state = {
      todoItems: [],
    }
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode !== 13) {
      return;
    }

    event.preventDefault();

    const node = this.newTodoRef.current
    let val = (ReactDOM.findDOMNode(node) as HTMLInputElement).value.trim();
    if (val) {
      this.addTodoItem(val);
      (ReactDOM.findDOMNode(node) as HTMLInputElement).value = '';
    }
  }

  public addTodoItem(val: string) {
    let newTodoItem = {
      title: val, 
      isCompleted: false
    }
    this.setState({
      todoItems: [
        newTodoItem,
        ...this.state.todoItems
      ]
    })
  }

  public toggle(item: ITodoItem, ) {
      const isCompleted = item.isCompleted;
      const index = this.state.todoItems.indexOf(item);
      const { todoItems } = this.state;
      todoItems[index].isCompleted = !isCompleted;
      let isCheckAll = todoItems.find((item: any) => item.isCompleted === false)
      if (isCheckAll === undefined) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      this.setState({
        todoItems: todoItems
      })
  }

  public toggleAll() {
    this.isCheckAll = !this.isCheckAll;
    let that = this;
    let todoItems = this.state.todoItems.map((item: any) => {
      item.isCompleted = that.isCheckAll;
      return item;
    })
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
  }

  public destroy(item: any) {
    let todoItems = this.state.todoItems.filter(function (candidate: any) {
      return candidate !== item;
    });
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
  }

  public render() {
    const { todoItems } = this.state;
    let main;

    if(this.state.todoItems.length) {
      main = (
        <ul>
            {
              todoItems.length > 0 && todoItems.map((item: ITodoItem, index: number) => {
                return <TodoItem
                  key={index}
                  todo={item}
                  onToggle={this.toggle.bind(this, item)}
                  onDestroy={this.destroy.bind(this, item)}
                />
              })
            }
          </ul>
      );
    }

    return (
      <div className="App">
        <h1>Todos App</h1>
        <div className="todo-content">
          <header>
            <img className={classNames({complete: this.isCheckAll})} src={checkAll} alt="" onClick={this.toggleAll.bind(this)}/>
            <input
              ref={this.newTodoRef}
              placeholder="What needs to be done"
              type="text"
              onKeyDown={e => this.handleNewTodoKeyDown(e)}
              autoFocus={true}
            />
          </header>
          {main}
        </div>
      </div>
    );
  }
}

export default App;
