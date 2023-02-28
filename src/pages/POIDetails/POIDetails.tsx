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
              pictureUrl={thisPOI.pictureUrl}        
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
              {/* <!--
                Heroicon name: mini/star

                Active: "text-gray-900", Default: "text-gray-200"
              --> */}
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

              {/* <!-- Heroicon name: mini/star --> */}
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

              {/* <!-- Heroicon name: mini/star --> */}
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

              {/* <!-- Heroicon name: mini/star --> */}
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

              {/* <!-- Heroicon name: mini/star --> */}
              <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
            </div>
            <p className="sr-only">4 out of 5 stars</p>
            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
          </div>
        </div>

        
      </div>
      
      {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
        {/* <!-- Description and details --> 
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900"></p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400"><span className="text-gray-600">----------------</span></li>

              <li className="text-gray-400"><span className="text-gray-600">------------</span></li>

              <li className="text-gray-400"><span className="text-gray-600">-------------</span></li>

              <li className="text-gray-400"><span className="text-gray-600">-------------</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">blablabla</p>
          </div>
        </div>
      </div> */}
    </div>
  </div>
</div>
  );
};

export default POIDetails;
