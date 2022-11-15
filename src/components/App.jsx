import React from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  submitFormHendler = (name, number) => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { name, number, id: nanoid() }],
    }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
      );
    });
  };

  getContactName = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name
    );
  };

  deleteContact = e => {
    const contactName = e.target.parentNode.id;
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name !== contactName;
    });
    return this.setState({ contacts: [...filteredContacts] });
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          getContactName={this.getContactName}
          onSubmitForm={this.submitFormHendler}
        />
        <h2 className={css.title}>Contacts</h2>
        <Filter handleChange={this.handleChange} filter={filter} />
        <ContactList
          contacts={contacts}
          filteredContacts={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
