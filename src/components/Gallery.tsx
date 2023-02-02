import React from 'react';

export interface Props {
  pictureUrl: [];
}

const Gallery = ({pictureUrl}: Props) => {
  return (
    <div>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img src=".\asset\img\map.png" alt="default image" className="h-full w-full object-cover object-center"/>
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img src="..\asset\img\defaultImage.png" alt="default image" className="h-full w-full object-cover object-center"/>
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img src=".\asset\img\map.png" alt="default image" className="h-full w-full object-cover object-center"/>
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img src=".\asset\img\map.png" alt="default image" className="h-full w-full object-cover object-center"/>
        </div>
      </div>
    </div>
  )
};

export default Gallery