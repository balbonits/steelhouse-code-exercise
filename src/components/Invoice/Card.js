import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

const Card = (props) => {
  return (<li id={props.id} key={props.id} className={"invoice-card"}>
    <span className={"invoice-card-line"}>
      <label className={"invoice-card-line-label"}>Name</label>
      <span className={"invoice-card-line-data"}>{props.content.name}</span>
    </span>
    <span className={"invoice-card-line"}>
      <label className={"invoice-card-line-label"}>Email</label>
      <span className={"invoice-card-line-data"}>{props.content.email}</span>
    </span>
    <span className={"invoice-card-line"}>
      <label className={"invoice-card-line-label"}>Due Date</label>
      <span className={"invoice-card-line-data"}>{props.content.dueDate}</span>
    </span>
    <span className={"invoice-card-line"}>
      <label className={"invoice-card-line-label"}>Total</label>
      <span className={"invoice-card-line-data"}>{props.content.total}</span>
    </span>
    <span className={"invoice-card-line"}>
      <Link to={`/edit/${props.id}`}>Edit</Link>
    </span>
  </li>);
}

export default Card;