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
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

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
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [], totalImages: 0, error: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('first');
  };

  render() {
    const { images, error, totalImages, query, isLoading } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {isLoading && <Text textAlign="center">Loading ... 😭</Text>}
        {error && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {images.map(({ src, alt, avg_color, id }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.handleLoadMore}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}

        {images.length === 0 && query !== '' && !isLoading && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
