import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          totalImages: total_results,
        }));
      } catch (error) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
