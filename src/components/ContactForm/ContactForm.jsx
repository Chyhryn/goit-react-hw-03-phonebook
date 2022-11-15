import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const normalizedName = name.toLowerCase();
    const findedName = this.props.getContactName(normalizedName);
    findedName
      ? alert(`${name} is already in contacts.`)
      : this.props.onSubmitForm(name, number);
    this.reset();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={name}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={number}
          />
        </label>
        <button className={css.submit_btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  getContactName: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};
