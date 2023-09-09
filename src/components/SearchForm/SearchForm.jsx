import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.value === '') {
      alert('Будь ласка, введіть коректний запит');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
