import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: parseFloat(0.00).toFixed(2)
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }  
  handleFieldChange(ev) {
    const newState = {...this.state};
    if (ev.target.name === 'price') {
      const newPrice = parseFloat(ev.target.value).toFixed(2);
      newState['price'] = (newPrice < 0) ? 0 : newPrice;
    } else {
      newState[ev.target.name] = ev.target.value;
    }
    this.props.onUpdateListItem({...newState, id: this.props.id});
    this.setState(newState);    
  }
  componentDidMount(){
    const {name, price} = this.props;
    this.setState({name, price});
  }
  render(){
    return (<li id={this.props.id} className={"form-list-item"}>
        <input className={"form-list-item-textbox"} type={"text"} value={this.state.name} name={"name"} onChange={this.handleFieldChange} />
        <input className={"form-list-item-textbox"} type={"number"} value={this.state.price} name={"price"} onChange={this.handleFieldChange} />
    </li>);  
  }
}

export default class List extends Component {
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
    return (<div className={"form-list"}>
      <ul className={"form-list-items"}>
      {this.props.items && this.props.items.length > 0 ?
        <li className={"form-list-header-item"}>
          <span className={"form-list-header-item-title"}>Description</span>
          <span className={"form-list-header-item-title"}>Price</span>
        </li> : ''}
      {this.props.items.map(item => <ListItem onUpdateListItem={this.handleUpdateListItem} id={item.id} key={item.id} name={item.name} price={item.price}/>) || ''}
      </ul>
      <span class={"form-buttons"}>
        <button className={"form-button add-item-button"} onClick={this.handleAddItem}>+</button>
      </span>
      <span className={"form-list-total"}>Total: ${this.props.total || parseFloat(0.00)}</span>
    </div>);    
  }
}