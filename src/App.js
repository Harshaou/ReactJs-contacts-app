import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';


class App extends Component {
  state = { 
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
    this.setState({contacts: contacts})
    })
  }
  
 removeContact = (contact) => {
   this.setState((state) => ({
     contacts: state.contacts.filter((c) => c.id !== contact.id)
   }))
   ContactsAPI.remove(contact)
 }

 CreateContact(contact) {
   ContactsAPI.create(contact).then(contact => {
     this.setState(state => ({
       contacts: this.state.contacts.concat([contact])
     }))
   })
 }


  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <ListContacts
        contacts={this.state.contacts}
        onDeleteContact={this.removeContact}
       />
      )} />
        
      <Route path="/create" render={({history}) =>(
        <CreateContact
          onCreateContact={(contact) =>{
            this.CreateContact(contact)
            history.push('/')
          }}
        />
      )} />
      </div>
    )
  }
}

export default App;