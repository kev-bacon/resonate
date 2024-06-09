import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Entry {
  id: number;
  content: string;
  date_time: string;
}

interface RecentEntriesCarouselProps {
  entries: Entry[];
}

const RecentEntriesCarousel: React.FC<RecentEntriesCarouselProps> = ({ entries }) => {
  return (
    <Carousel>
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col grow justify-center rounded-3xl max-md:mt-8">
          <div className="flex flex-col px-6 py-11 bg-gray-100 max-md:px-5">
            <div className="text-xl leading-8 text-slate-600">
              {entry.content}
            </div>
            <div className="self-center mt-20 text-base leading-5 text-center text-neutral-600 max-md:mt-10">
              {new Date(entry.date_time).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default RecentEntriesCarousel;
