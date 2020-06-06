import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

interface IAppProps {

}

interface IAppState {
  todoItems: any;
}
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      todoItems: [
        { title: 'Buy snack', isComplete: false },
        { title: 'Go to company', isComplete: true },
        { title: 'Play soccer', isComplete: false },
      ]
    }
  }

  public render() {
    return (
      <div className="App">
        {
          this.state.todoItems.map((item : any, index: number) => {
           return  <TodoItem key={index} item={item} />
          })
        }
      </div>
    );
  }

}

export default App;
