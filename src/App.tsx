import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import checkAll from './assets/img/down-arrow.svg'
import * as ReactDOM from "react-dom";

interface IAppProps {
}

interface IAppState {
  todoItems: any;
  newItem: any;
}
class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState;
  private isCheckAll = false;
  private newTodoRef = React.createRef<HTMLInputElement>()

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      todoItems: [
        { title: 'Buy snack', isComplete: false },
        { title: 'Go to company', isComplete: true },
        { title: 'Play soccer', isComplete: false },
      ],
      newItem: ''
    }
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode !== 13) {
      return;
    }

    event.preventDefault();

    const node = this.newTodoRef.current
    let val = (ReactDOM.findDOMNode(node) as HTMLInputElement).value.trim();
    console.log(val, 92392939)
    if (val) {
      this.addTodoItem(val);
      (ReactDOM.findDOMNode(node) as HTMLInputElement).value = '';
    }
  }

  public addTodoItem(val: string) {
    let newTodoItem = {
      title: val, 
      isComplete: false
    }
    this.setState({
      todoItems: [
        newTodoItem,
        ...this.state.todoItems
      ]
    })
  }

  public toggle(item?: any, ) {
      const isComplete = item.isComplete;
      const index = this.state.todoItems.indexOf(item);
      const { todoItems } = this.state;
      todoItems[index].isComplete = !isComplete;
      this.setState({
        todoItems: todoItems
      })  
  }
  public toggleAll() {
    this.isCheckAll = !this.isCheckAll;
    let that = this;
    let todoItems = this.state.todoItems.map((item: any) => {
      item.isComplete = !that.isCheckAll;
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
    return (
      <div className="App">
        <h1>Todos App</h1>
        <div className="todo-content">
          <header>
            <img src={checkAll} alt="" onClick={this.toggleAll.bind(this)}/>
            <input
              ref={this.newTodoRef}
              placeholder="What needs to be done"
              type="text"
              onKeyDown={e => this.handleNewTodoKeyDown(e)}
              autoFocus={true}
            />
          </header>
          <ul>
            {
              todoItems.length > 0 && todoItems.map((item: any, index: number) => {
                return <TodoItem
                  key={index}
                  item={item}
                  toggle={this.toggle.bind(this, item)}
                  destroy={this.destroy.bind(this, item)}
                />
              })
            }
          </ul>
        </div>
      </div>
    );
  }

}

export default App;
