import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tooltip,
} from '@material-tailwind/react';
import { useQuery } from '@apollo/client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ProfileInfoCard } from '../../widgets/cards/profile-info-card';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { IPOIData } from 'src/types/POIType';
import noImage from '../../asset/img/no-image-icon.png';
import StarRating from 'src/components/StarRating';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';

export function Profile() {
  const { user } = useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const POIData = useQuery(GET_POI_QUERY);

  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element?.clientHeight) {
      const lineHeight = parseInt(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 2;
      if (element.clientHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, []);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user && user.firstname}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Eclaireur
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-6 px-4 xl:grid-cols-3">
            {/*      <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: 'text-sm font-normal text-blue-gray-500',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <ProfileInfoCard
              title="Profile Information"
              // description={user?.description ? user.description : 'Please enter a description'}
              details={{
                firstname: user ? user.firstname : 'undefined',
                lastname: user ? user.lastname : 'undefined',
                email: user ? user.email : 'undefined',
                /*                 'social': (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),  */
              }}
              action={
                <Tooltip content="Edit Profile">
                  <button
                    type="submit"
                    form="userForm"
                    value="Update"
                    onClick={() => {
                      if (isEditMode === false) {
                        setIsEditMode(!isEditMode);
                      }
                      if (isEditMode === true) {
                        document.body.style.cursor = 'wait';
                        setTimeout(() => {
                          document.body.style.cursor = 'default';
                          setIsEditMode(!isEditMode);
                        }, 2000);
                      }
                    }}
                  >
                    {isEditMode === false ? (
                      <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                    ) : (
                      <div className="border-2 px-2 text-blue-gray-500">
                        Save
                      </div>
                    )}
                  </button>
                </Tooltip>
              }
              isEditMode={isEditMode}
            />
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
            <div className="pl-2 xl:col-span-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Point of interests - Migth interest you
              </Typography>
              {/*             <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Places recently visited
            </Typography> */}
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {POIData.data?.getAllPoi
                  .map((poi: IPOIData) => (
                    <Card
                      key={poi.id}
                      color="transparent"
                      shadow={false}
                      className="min-h-full"
                    >
                      <li className="border-solid border rounded-xl mb-12 h-full">
                        <Card className="h-full flex flex-col justify-between">
                          {' '}
                          <Link
                            key={poi.id}
                            to={`/point-of-interest/${poi.id}/${poi.name}`}
                            style={{ cursor: 'pointer' }}
                          >
                            <CardHeader className="flex items-center justify-center">
                              <Typography className="text-center overflow-hidden">
                                <div ref={textRef}>{poi.name}</div>
                                {isTruncated && '...'}
                              </Typography>
                            </CardHeader>
                            <CardBody className="p-3 flex flex-col justify-between">
                              <img
                                src={poi.pictureUrl ? poi.pictureUrl : noImage}
                                alt={poi.name}
                                className="w-[90%] m-auto bg-cover bg-center"
                              />
                            </CardBody>
                          </Link>
                          {user?.id && (
                            <StarRating
                              className="border-2 flex items-center justify-center"
                              userId={user?.id}
                              poiId={poi?.id}
                            />
                          )}
                          <CardFooter
                            divider
                            className="flex items-center justify-between py-1"
                          >
                            <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
                              {poi.description.slice(0, 20)}...
                            </Typography>
                          </CardFooter>
                        </Card>
                      </li>
                    </Card>
                  ))
                  .reverse()}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
