import React, { Component } from 'react';

const FormListItem = (props) => {
  return (<li className={"form-list-item"}>
    <span className={"form-list-item-field"}>
      <input className={"form-list-item-field-textbox"} type={"text"} />
      <input className={"form-list-item-field-textbox"} type={"number"} />
    </span>
  </li>)
};

class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      total: 0
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }
  handleAddItem(){}
  getTotal(){}
  render(){
    return(<div className={"form-list-section"}>
      <ul className={"form-list"}>
        <FormListItem />
      </ul>
      <button className={"form-list-button add-item-button"} onClick={this.handleAddItem}>Add Item</button>
      <div className={"form-list-footer"}>
        <label>Total</label>
        <span>$ {this.state.total}</span>
      </div>
    </div>);
  }
};

export default FormList;