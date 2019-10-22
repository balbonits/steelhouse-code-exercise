import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addInvoice, deleteInvoice, updateInvoice } from '../../store/actions';

import './Form.css';
// import FormList from './FormList';


/*
  TODO:
  * save/update value from ListItem
  * update 'items' array with new item values
*/


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }  
  handleFieldChange(ev) {
    const newState = {...this.state};
    newState[ev.target.name] = ev.target.value;
    this.props.onUpdateListItem({...newState, id: this.props.id});
    this.setState(newState);    
  }
  componentDidMount(){
    const {name, price} = this.props;
    this.setState({name, price});
  }
  render(){
    return (<li id={this.props.id}>
      <span className={"form-list-item-field"}>
        <input className={"form-list-item-field-textbox"} type={"text"} value={this.state.name} name={"name"} onChange={this.handleFieldChange} />
        <input className={"form-list-item-field-textbox"} type={"number"} value={this.state.price} name={"price"} onChange={this.handleFieldChange} />
      </span>  
    </li>);  
  }
}

class List extends Component {
  constructor(props){
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleUpdateListItem = this.handleUpdateListItem.bind(this);
  }
  handleAddItem(){
    const newId = this.props.items.length + 1;
    const newItems = [...this.props.items, { id: newId, name: '', price: 0}];
    this.props.onUpdateList(newItems);
  }
  handleUpdateListItem(listItem){
    const itemIdx = this.props.items.findIndex((item) => (parseInt(item.id) === parseInt(listItem.id)))
    const newItems = [...this.props.items];
    newItems[itemIdx] = listItem;
    this.props.onUpdateList(newItems);
  }
  render() {
    return (<div>
      <ul>
      {this.props.items.map(item => <ListItem onUpdateListItem={this.handleUpdateListItem} id={item.id} key={item.id} name={item.name} price={item.price}/>) || ''}
      </ul>
      <button onClick={this.handleAddItem}>Add Item</button>
    </div>);    
  }
}

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
    let result = 0;
    items.map(item => result += parseInt(item.price));
    return result;
  }

  componentDidMount() {
    if(this.props.id) {
      this.setState(this.fetchInvoice(this.props.id).content);
    }
  }

  renderCreateButtons() {
    return (<span className={"form-buttons"}>
      <Link to={"/"}>Back</Link>
      <button onClick={this.handleCreateInvoice}>Create</button>
    </span>);
  }

  renderEditButtons() {
    return (<span className={"form-buttons"}>
      <Link to={"/"}>Back</Link>
      <button onClick={this.handleDeleteInvoice}>Delete</button>
      <button onClick={this.handleUpdateInvoice}>Save</button>
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
        <List items={this.state.items} onUpdateList={this.handleUpdateList} />
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