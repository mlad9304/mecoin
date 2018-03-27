import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { TopLeaderItem } from 'components';
import './TopLeaders.scss';

const TopLeaders = function TopLeadersComponent() {
  const responsive = {
    0: {
      items: 1
    },
    400: {
      items: 4
    },
    700: {
      items: 6
    },
    900: {
      items: 8
    }, 
    1100: {
      items: 10
    },
    1400: {
      items: 12
    },
    1600: {
      items: 12
    }
  };
  return (
    <div className="topLeadersContainer">
      <p className="title">Top Leaders</p>
      <div className='w-100 position-absolute carousel'>
        <AliceCarousel
          responsive={responsive}
          fadeOutAnimation={false}
          mouseDragEnabled={false}
          infinite={false}
          dotsDisabled={true}
        >
          <TopLeaderItem szNumber="1st" />
          <TopLeaderItem szNumber="2nd" />
          <TopLeaderItem szNumber="3rd" />
          <TopLeaderItem szNumber="4th" />
          <TopLeaderItem szNumber="5th" />
          <TopLeaderItem szNumber="6th" />
          <TopLeaderItem szNumber="7th" />
          <TopLeaderItem szNumber="8th" />
          <TopLeaderItem szNumber="9th" />
          <TopLeaderItem szNumber="10th" />
          <TopLeaderItem szNumber="11th" />
          <TopLeaderItem szNumber="12th" />
          <TopLeaderItem szNumber="13th" />
          <TopLeaderItem szNumber="14th" />
          <TopLeaderItem szNumber="15th" />
          <TopLeaderItem szNumber="16th" />
          <TopLeaderItem szNumber="17th" />
          <TopLeaderItem szNumber="18th" />
          <TopLeaderItem szNumber="19th" />
        </AliceCarousel>
      </div>
    </div>
  );
};

export default TopLeaders;
