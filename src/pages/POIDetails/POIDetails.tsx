import React from 'react';
import POIComment from 'src/components/Comment';

const POIDetails = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Point Of Interest Details
      </h1>
      <POIComment poiId={1} userId={7} />
    </>
  );
};

export default POIDetails;
