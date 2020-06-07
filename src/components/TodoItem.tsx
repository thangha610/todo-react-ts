/// <reference path="../interfaces.d.ts"/>
import React from 'react';
import classNames from "classnames";
import './TodoItem.css';
import check from '../assets/img/check.svg';
import verified from '../assets/img/verified.svg';

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  public state: ITodoItemState;

  constructor(props: ITodoItemProps) {
    super(props);
    this.state = { editText: this.props.todo.title }
  }

  public render() {
    const { todo, onToggle, onDestroy } = this.props;
    let url = verified;
    if (todo.isCompleted) {
      url = check;
    }
    let todoClass = classNames({ 'todo-complete': todo.isCompleted });
    return (
      <li className="todo-item">
        <div className="view">
          <img className="check-img" src={url} alt="" onClick={onToggle}/>
          <span className={todoClass}>
            {todo.title}
          </span>
          <button className="destroy" onClick={onDestroy}/>
        </div>
      </li>
    );
  }

}

export default TodoItem;
