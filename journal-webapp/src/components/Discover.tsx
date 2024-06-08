import React from 'react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  const entries = [
    {
      id: '1',
      title: 'AI Generated Title',
      tags: 'Happy, travel',
      date: 'June 7, 2024',
      excerpt: `
        The only moment, the only life we have is in the NOW. What happened a
        few moments or several years ago is gone, what will happen this
        evening, or next month when we go on holidays is not here yet.
      `,
    },
    {
      id: '2',
      title: 'Another AI Title',
      tags: 'Sad, travel',
      date: 'June 8, 2024',
      excerpt: `
        The only moment, the only life we have is in the NOW. What happened a
        few moments or several years ago is gone, what will happen this
        evening, or next month when we go on holidays is not here yet.
      `,
    },
    // Add more entries as needed
  ];

  return (
    <div className="flex flex-col items-center pb-20 bg-white">
      <div className="flex flex-col self-stretch pt-5 w-full text-xl font-bold leading-4 text-center whitespace-nowrap bg-gray-50 text-zinc-700 max-md:max-w-full">
			  <div className="flex gap-5 justify-between items-center self-start ml-4 max-md:flex-wrap">
			 <Link to="/">	 
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="self-stretch aspect-[2.7] w-[234px]"
					  />
					  </Link>
          <div className="shrink-0 self-stretch my-auto w-0.5 h-10 bg-gray-200 rounded-sm" />
				  <Link to="/" className="self-stretch my-auto">Home</Link>
				  <Link to="/chat" className="self-stretch my-auto">Chat</Link>
          <Link to="/upload" className="self-stretch my-auto">Upload</Link>
          <Link to="/discover" className="self-stretch my-auto">Discover</Link>
        </div>
        <div className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-28 text-4xl font-medium leading-10 text-center text-neutral-700 max-md:mt-10">
        All Entries
      </div>
      {entries.map((entry) => (
        <Link
          key={entry.id}
          to={`/entry/${entry.id}`}
          className="flex flex-col flex-wrap justify-center content-center px-20 py-3 mt-14 w-full max-w-[1054px] max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          <div className="flex gap-5 justify-between items-center font-medium max-md:flex-wrap max-md:max-w-full">
            <div className="self-stretch text-2xl leading-7 text-neutral-700 max-md:max-w-full">
              {entry.title}
            </div>
            <div className="self-stretch my-auto text-xs leading-5 text-right text-black uppercase tracking-[2px]">
              Tags: {entry.tags}
            </div>
            <div className="self-stretch my-auto text-base leading-6 text-slate-400">
              {entry.date}
            </div>
          </div>
          <div className="mt-12 text-base leading-6 text-neutral-700 max-md:mt-10 max-md:max-w-full">
            {entry.excerpt}
          </div>
        </Link>
      ))}

    </div>
  );
};

export default Discover;
