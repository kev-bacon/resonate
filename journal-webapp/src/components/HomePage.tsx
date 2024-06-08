import React from 'react';
import { Link } from 'react-router-dom';
import SpiderGraph from './SpiderGraph';

const HomePage: React.FC = () => {
  // Mock data for the spider graph
  const mockData = [4, 2, 5, 3, 1, 4];

  return (
    <div className="flex flex-col pb-14 bg-white">
      <div className="flex z-10 flex-col pt-5 w-full text-xl font-bold leading-4 text-center whitespace-nowrap bg-gray-50 text-zinc-700 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-center self-start ml-4 max-md:flex-wrap">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1d1b9190cc7e8718e6ce51bd8840a89d76a22daaed94fdc2aeb7001f8d339d92?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="self-stretch aspect-[2.7] w-[234px]"
          />
          <div className="shrink-0 self-stretch my-auto w-0.5 h-10 bg-gray-200 rounded-sm" />
          <div className="self-stretch my-auto">Home</div>
          <div className="self-stretch my-auto">Chat</div>
          <div className="self-stretch my-auto">Upload</div>
          <div className="self-stretch my-auto">Discover</div>
        </div>
        <div className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="flex justify-center items-center px-16 py-20 mt-0 w-full bg-gray-100 max-md:px-5 max-md:max-w-full">
        <div className="mt-6 mb-1 w-full max-w-[1163px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto font-bold max-md:mt-10 max-md:max-w-full">
                <div className="text-8xl tracking-tightertext-neutral-900 max-md:max-w-full max-md:text-4xl max-md:leading-10">
                  Take a walk outside today
                </div>
                <Link to="/upload" className="justify-center self-start px-6 py-4 mt-6 text-xl leading-4 text-center text-gray-50 bg-neutral-900 rounded-[90px] max-md:px-5">
                  Upload entry
                </Link>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
               <SpiderGraph data={mockData} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center self-center mt-24 w-full max-w-[1272px] max-md:mt-10 max-md:max-w-full">
        <div className="text-3xl font-bold tracking-tight text-center text-black">
          Last few days in review
        </div>
        <div className="flex gap-5 justify-between items-center self-stretch mt-24 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d779d83e4dd2f7d5495e5f1bb21deb8f9b8bcc81a4b674e30d801e6a79ec33dc?apiKey=285d23d46715474fb293f76359ad36c5&"
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div className="self-stretch max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center rounded-3xl max-md:mt-8">
                  <div className="flex flex-col px-6 py-11 bg-gray-50 max-md:px-5">
                    <div className="text-xl leading-8 text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam scelerisque posuere vivamus egestas porttitor.
                      Hendrerit vitae at nulla varius proin ipsum. Purus augue
                      in morbi.
                    </div>
                    <div className="self-center mt-20 text-base leading-5 text-center text-neutral-600 max-md:mt-10">
                      June 7, 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center rounded-3xl max-md:mt-8">
                  <div className="flex flex-col px-6 py-11 bg-gray-100 max-md:px-5">
                    <div className="text-xl leading-8 text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam scelerisque posuere vivamus egestas porttitor.
                      Hendrerit vitae at nulla varius proin ipsum. Purus augue
                      in morbi.
                    </div>
                    <div className="self-center mt-20 text-base leading-5 text-center text-neutral-600 max-md:mt-10">
                      June 7, 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center rounded-3xl max-md:mt-8">
                  <div className="flex flex-col px-6 py-11 bg-gray-100 max-md:px-5">
                    <div className="text-xl leading-8 text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam scelerisque posuere vivamus egestas porttitor.
                      Hendrerit vitae at nulla varius proin ipsum. Purus augue
                      in morbi.
                    </div>
                    <div className="self-center mt-20 text-base leading-5 text-center text-neutral-600 max-md:mt-10">
                      June 7, 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center self-stretch p-2 my-auto border-2 border-gray-200 border-solid rounded-[40px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cced0859d3277768acb8785abd3add1bc5a1fb5eab6ff97d35ae9df29a5e69a?apiKey=285d23d46715474fb293f76359ad36c5&"
              className="w-6 aspect-square"
            />
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf1edcbdeac70f47457a933a9268ead76759534cac2f2308fd3c1d8174c18ff5?apiKey=285d23d46715474fb293f76359ad36c5&"
          className="mt-10 w-20 aspect-[10]"
        />
      </div>
    </div>
  );
}

export default HomePage;
