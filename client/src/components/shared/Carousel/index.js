import React, { Component } from 'react';
import ex1 from '../../../Resources/ex1.jpeg';
import ex2 from '../../../Resources/ex2.jpg';
import ex3 from '../../../Resources/ex3.jpeg';
import ex4 from '../../../Resources/ex4.jpg';
import ex5 from '../../../Resources/ex5.jpg';
import ex6 from '../../../Resources/ex6.jpg';
import ex7 from '../../../Resources/ex7.jpg';

import InfiniteCarousel from 'react-leaf-carousel';

class DemoCarousel extends Component {
  render() {
    return (
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]}
        dots={true}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        <div>
          <img alt="" src={ex1} />
        </div>
        <div>
          <img alt="" src={ex2} />
        </div>
        <div>
          <img alt="" src={ex3} />
        </div>
        <div>
          <img alt="" src={ex4} />
        </div>
        <div>
          <img alt="" src={ex5} />
        </div>
        <div>
          <img alt="" src={ex6} />
        </div>
        <div>
          <img alt="" src={ex7} />
        </div>
      </InfiniteCarousel>
    );
  }
}
document.getElementById('root');

export default DemoCarousel;
