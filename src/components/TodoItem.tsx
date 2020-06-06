import React from 'react';
import classNames from "classnames";
import './TodoItem.css';
import check from '../assets/img/check.svg';
import verified from '../assets/img/verified.svg';

interface ITodoProps {
  item?: any;
  toggle?: any;
  toggleAll?: any;
  destroy?: any;
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
    const { item, toggle, destroy } = this.props;
    let url = verified;
    if (item.isComplete) {
      url = check;
    }
    let todoClass = classNames({ 'todo-complete': item.isComplete });
    return (
      <li className="todo-item">
        <div className="view">
          <img className="check-img" src={url} alt="" onClick={toggle}/>
          <span className={todoClass}>
            {item.title}
          </span>
          <button className="destroy" onClick={destroy}/>
        </div>
      </li>
    );
  }

}

export default TodoItem;
