import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Invoice/Card';

import './pages.css';

const List = (props) => {
  return (<div>
    <div className={"invoice-cards-list-createInvoice-button-section"}>
      <Link className={"invoice-cards-list-createInvoice-button"} to={"/create"}>Create Invoice</Link>
    </div>
    <ul className={"invoice-cards-list"}>
      {props.invoices ? props.invoices.map((item) => {
        return (<Card id={item.id} key={item.id} content={item.content} />);
        }) : ''}
    </ul>
  </div>);
}

const mapStateToProps = (globalState) => {
  return {
    invoices: globalState.invoices
  };
};

export default connect(
  mapStateToProps
)(List);