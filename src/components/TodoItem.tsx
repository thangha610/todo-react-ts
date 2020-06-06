import React from 'react';
import classNames from "classnames";
import './TodoItem.css';

interface ITodoProps {
  item?: any;
}

interface ITodoState {
}

class TodoItem extends React.Component<ITodoProps, ITodoState> {
  public state: ITodoState;

  constructor(props: ITodoProps) {
    super(props);
    this.state = this.props.item;
  }

  public render() {
    const { item } = this.props;
    let todoClass = classNames({'todo-complete': item.isComplete});
    return (
      <div className="TodoItem">
        <p className={todoClass}>{ item.title }</p>
      </div>
    );
  }

}

export default TodoItem;
