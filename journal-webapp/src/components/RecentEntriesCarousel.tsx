import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Entry } from '../types';

interface RecentEntriesCarouselProps {
  entries: Entry[];
}

const RecentEntriesCarousel: React.FC<RecentEntriesCarouselProps> = ({ entries }) => {
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
      {entries.map((entry, index) => (
        <div key={index} className="flex flex-col max-w-2xl mx-auto p-5 text-left">
          <h3 className="text-2xl font-bold mb-2 text-center">{entry.title}</h3>
          <p className="text-base leading-relaxed">{entry.content}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default RecentEntriesCarousel;
