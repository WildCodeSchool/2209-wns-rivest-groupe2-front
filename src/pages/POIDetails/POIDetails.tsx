import React from 'react';
import { useEffect, useState } from 'react';
import { IPOIData } from 'src/types/POIType';
import POIInfo from 'src/components/POIInfos';
// import Gallery from 'src/components/Gallery';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';


export const GET_POI_QUERY = gql`
  query GetAllPois {
    getAllPoi {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      pictureUrl
      websiteURL
      description
      priceRange
      city
      daysOpen
      hoursOpen
      hoursClose
    }
  }
`;

const POIDetails = () => {
 const { loading, error, data } = useQuery(GET_POI_QUERY); 
 const {id} = useParams()
const thisPOI = data?.getAllPoi?.find((poi: { id: number; }) => poi.id === Number(id))

  

 
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue :(</p>;

  if (!thisPOI) return <p>Pas de point d'interet</p>

  return (
  <div className="bg-white">
  <div className="pt-6">
    {/* Navigation */}
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">
            {thisPOI.type}
            </a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li className="text-sm">
          <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
          {thisPOI.name}
          </a>
        </li>
      </ol>
    </nav>
    {/* Image gallery */}   
         {/* <Gallery */}
              pictures... {thisPOI.pictureUrl}        
        {/* /> */}
  {/* POI Detail */}
  <div className="product-detail-desc">
  </div>
    <ul
      id="poi-detail"
      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
      >
        <li className="mb-8">
          <POIInfo
          // poiData={data.getPoi(poi: IPOIData)} 
          id={thisPOI.id}
          name={thisPOI.name}
          address={thisPOI.address}
          postal={thisPOI.postal}
          city={thisPOI.city}
          pictureUrl={thisPOI.pictureUrl}
          description={thisPOI.description}
          type={thisPOI.type}
          coordinates={thisPOI.coordinates}
          websiteURL={thisPOI.websiteURL}
          creationDate={thisPOI.creationDate}
          priceRange={thisPOI.priceRange}
          daysOpen={thisPOI.daysOpen}
          hoursOpen={thisPOI.hoursOpen}
          hoursClose={thisPOI.hoursClose}
          />
        </li>
    </ul>
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h2 className="font-bold tracking-tight text-gray-900 ">Information</h2>
      </div>

      {/* <!-- Options --> */}
      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Reviews</h2>

        {/* <!-- Reviews --> */}
        <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {/* <!-- Heroicon name: heart filled --> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {/* <!-- Heroicon name: heart empty --> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <p className="sr-only">4 out of 5 stars</p>
            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 likes</a>
          </div>
        </div>

        
      </div>
      
       <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
         {/* <!-- Description and details -->  */}
        <div>
          <div className="space-y-6">
            <p className="text-base text-gray-900"></p>
          </div>
        </div>
        <div className="mt-1">
          <h2 className="text-sm font-medium text-gray-900">Description:</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">{thisPOI.description}...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default POIDetails;
