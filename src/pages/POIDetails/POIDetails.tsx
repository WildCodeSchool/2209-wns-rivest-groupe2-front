import React from 'react';
import { useEffect, useState } from 'react';
import { IPOIData } from 'src/types/POIType';
import POIInfo from 'src/components/POIInfos';
// import Gallery from 'src/components/Gallery';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import POICard from 'src/components/POICard';
import { Link } from 'react-router-dom';
import POIComment from 'src/components/Comment';
import Gallery from 'src/components/Gallery';


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
  const { id } = useParams();
  const thisPOI = data?.getAllPoi?.find(
    (poi: { id: number }) => poi.id === Number(id)
  );

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue :(</p>;

  if (!thisPOI) return <p>Pas de point d'interet</p>;
  
  const similarPOIs = data?.getAllPoi?.filter(
    (poi: { id: number }) => poi.id !== Number(id)
  ).slice(0, 6);


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
         {/* <Gallery pictureUrls={thisPOI.pictureUrls}/>  */}
    {/* POI Detail */}
    <div className="product-detail-desc ">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-3 px-10">
          <POIInfo 
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
        </div>
      </div>
      <div className="mx-auto px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h2>Information</h2>
        </div>      
      </div>
      {/* <!-- Options --> */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Comments</h2>
              {/* <!-- Comments --> */}
              <div className="col-span-1 lg:col-span-3 px-10">
                  <POIComment poiId={1} userId={7} />
                </div>
              </div>
            </div>
        </div>
      {/* <!-- POI similaires -->  */}
        <div className="mt-4 lg:row-span-3 lg:mt-10">
          <h2 className="col-span-1 lg:col-span-3 px-10">Autres lieux similaires</h2>
          <div className="flex flex-row items-stretch">
          {similarPOIs && (
            <ul
              id="poi-similar"
              className="flex justify-around py-4 w-4/5 my-3.5"
            >
              {similarPOIs.map((poi: IPOIData) => (
                <Link
                  key={poi.id}
                  to={`/point-of-interest/${poi.id}/${poi.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <li className="h-[200px] w-[150px] border-solid border rounded-xl mb-12">
                    <POICard
                      name={poi.name}
                      address={poi.address}
                      postal={poi.postal}
                      city={poi.city}
                      pictureUrl={poi.pictureUrl}
                      description={poi.description}
                      type={poi.type}
                      id={poi.id}
                    />
                  </li>
                </Link>
              ))}
            </ul>
            )}
          </div>
        </div>
    </div>
  );
}

export default POIDetails;
