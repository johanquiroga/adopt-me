import React, { Component } from 'react';
import { Photo } from "@frontendmasters/pet";

interface IProps {
  media: Photo[]
}

interface IState {
  photos: Photo[];
  active: number;
}

class Carousel extends Component<IProps, IState> {
  state = {
    photos: [],
    active: 0,
  };

  static getDerivedStateFromProps({ media }: IProps) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return {
      photos,
    };
  }

  handleIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
