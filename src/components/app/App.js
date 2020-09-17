import React, { Component } from 'react';
import './App.css';
import Header from '../header/header';
import AddItem from '../add-item';
import List from '../list';

export default class App extends Component {

  async importUsers(url) {
    const res = await fetch(url)
    return await res.json()
  }
  

  array = localStorage.array ? JSON.parse(localStorage.array) : []
    
  state = {
    names: this.array,
    users: null,
    search: '',
    open: false,
    statusFilter: 'вожатый'
  }

  async getUsers() {
    const res = await this.importUsers('https://reqres.in/api/users?page=1')
    return res.data.map(this._transformUser)
  }

  constructor() {
    super()
    this.updateUser()
  }

  updateUser = () => {
    this.getUsers()
      .then((user) => {
        this.setState({
          users: user
        })
      })
  }

  _transformUser(user) {
    return {
      id: user.id,
      label: user.first_name,
      status: 'Участник',
      approved: false
    }
  }

  i = Math.max(0, ...this.state.names.map((item) => item.id)) + 1
  console = console.log(this.i)

  onToogle = () => {

    this.setState((state) => {
      return { open: !state.open }
    })
  }
    
  onClick = (label, status) => {
        
    this.setState((state) => {
      const item = this.addItem(label, status);
      localStorage.setItem('array', JSON.stringify(state.names));
      return { names: [...state.names, item] }
    })

  }

  addItem(label, status) {
    return {
      id: this.i++,
      label,
      status,
      approved: false
    }
  }
  
  onSearchChange = (search) => {
    if (search.trim()) {
      this.setState({ search });
    } else { this.setState({ search: '' }) }
  };

  onFilter = (search, names) => {
    return names.filter(({ label }) => {
      return label.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  onStatus = (names, statusFilter) => {
    const admFilter = names.filter(({ status }) => {
      return status.toLowerCase() === statusFilter
    })
    return admFilter
  }

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.names.findIndex((name) => name.id === id);
      console.log(`Deleted id: ${idx}`)
      const names = [
        ...state.names.slice(0, idx),
        ...state.names.slice(idx + 1)
      ];
      return {names}
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onApproved = (id) => {
    this.setState((state) => {
      const names = this.toggleProperty(state.names, id, 'approved');
      return { names };
    });
  }

  render() {
  
    console.log(`Состояние users: ${this.state.users}`)
    
    const { names, search, open } = this.state
    localStorage.setItem('array', JSON.stringify(names));
    const visibleItems = this.onFilter(search, names)
    const adm = this.onStatus(this.onFilter(search, names), 'вожатый')
    const all = this.onStatus(this.onFilter(search, names),  'участник')
    
    return (
      <div>
        <Header onFilter={this.onSearchChange}/>
        <div className='container'>
          <List names={visibleItems} onDelete={this.onDelete} onApproved={this.onApproved} />

          <h2>Администрация лагеря</h2>
          <List names={adm} onDelete={this.onDelete} onApproved={this.onApproved} />
          
          <h2>Участники лагеря</h2>
          <List names={all} onDelete={this.onDelete} onApproved={this.onApproved}/>
          
          <AddItem onItemClick={this.onClick} onToogle={this.onToogle} open={open}/>
        </div>
        
      </div>
    );
  }
}
