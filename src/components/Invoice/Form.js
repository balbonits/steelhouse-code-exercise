import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addInvoice, deleteInvoice, updateInvoice } from '../../store/actions';

import './Form.css';
import List from './FormList';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      dueDate: '',
      items: [],
      total: 0
    };

    this.renderCreateButtons = this.renderCreateButtons.bind(this);
    this.renderEditButtons = this.renderEditButtons.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
    this.handleDeleteInvoice = this.handleDeleteInvoice.bind(this);
    this.handleUpdateInvoice = this.handleUpdateInvoice.bind(this);
    this.handleUpdateList = this.handleUpdateList.bind(this);
  }

  handleChange(ev) {
    const newState = {...this.state};
    newState[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  handleCreateInvoice() {
    this.props.onCreateInvoice(this.state);
    this.props.history.push("/");
  }

  handleDeleteInvoice() {
    this.props.onDeleteInvoice(this.props.id);
    this.props.history.push("/");
  }

  handleUpdateInvoice() {
    this.props.onUpdateInvoice(this.props.id, this.state);
    this.props.history.push("/");
  }

  handleUpdateList(items){
    const newState = {
      ...this.state,
      items: [...items],
      total: this.calculateTotal(items)
    };
    this.setState(newState);
  }

  fetchInvoice(id) {
    if(!id) return;

    return this.props.invoices.reduce((item) => (parseInt(item.id) === parseInt(id)));
  }

  calculateTotal(items){
    let result = parseFloat(0.00);
    items.map(item => result += parseFloat(item.price));
    return result.toFixed(2);
  }

  componentDidMount() {
    if(this.props.id) {
      this.setState(this.fetchInvoice(this.props.id).content);
    }
  }

  renderCreateButtons() {
    return (<span className={"form-buttons"}>
      <Link className={"form-button back-button"} to={"/"}>Back</Link>
      <button className={"form-button create-button"} onClick={this.handleCreateInvoice}>Create</button>
    </span>);
  }

  renderEditButtons() {
    return (<span className={"form-buttons"}>
      <Link className={"form-button back-button"} to={"/"}>Back</Link>
      <button className={"form-button delete-button"} onClick={this.handleDeleteInvoice}>Delete</button>
      <button className={"form-button save-button"} onClick={this.handleUpdateInvoice}>Save</button>
    </span>);
  }
  
  render() {
    return (<div className={"form-" + this.props.type + " invoice-form"}>
        <span className={"form-field"}>
          <label className={"form-field-label"}>Name</label>
          <input type={"text"} className={"form-field-textbox"} required onChange={this.handleChange} value={this.state.name} name={"name"}/>
        </span>
        <span className={"form-field"}>
          <label className={"form-field-label"}>Email</label>
          <input type={"email"} className={"form-field-textbox"} required onChange={this.handleChange} value={this.state.email} name={"email"}/>
        </span>
        <span className={"form-field"}>
          <label className={"form-field-label"}>Due Date</label>
          <input type={"date"} className={"form-field-textbox"} required onChange={this.handleChange} value={this.state.dueDate} name={"dueDate"}/>
        </span>
        <List items={this.state.items} onUpdateList={this.handleUpdateList} total={this.state.total}/>
        {this.props.type && this.props.type === 'edit' ? this.renderEditButtons() : this.renderCreateButtons()}
    </div>);
  }
}

export default connect(
  state => {
    return {
      invoices: state.invoices
    };
  },
  dispatch => {
    return {
      onCreateInvoice: content => {
        dispatch(addInvoice(content));
      },
      onDeleteInvoice: id => {
        dispatch(deleteInvoice(id));
      },
      onUpdateInvoice: (id, content) => {
        dispatch(updateInvoice(id, content));
      }
    }
  }
)(withRouter(Form));