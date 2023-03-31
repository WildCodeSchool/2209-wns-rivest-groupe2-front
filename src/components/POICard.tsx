import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import noImage from '../asset/img/no-image-icon.png';
import { IPOICard } from 'src/types/POIType';
import StarRating from 'src/components/StarRating';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
/* import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai'; */
import ModalConfirmDelete from './ModalAddPlace/ModalConfirmDelete';
import ModalAddPlace from './ModalAddPlace/ModalAddPlace';

export function goodWrittenType(type: string) {
  switch (type) {
    case 'restaurant':
      return 'Restaurant';
    case 'fast-food':
      return 'Fast Food';
    case 'bar':
      return 'Bar';
    case 'lieu de culte':
      return 'Lieu de culte';
    case 'hotel':
      return 'Hôtel';
    case 'musee':
      return 'Musée';
    default:
      return '';
  }
}

export default function POICard(props: IPOICard) {
  const {
    name,
    address,
    postal,
    city,
    pictureUrl,
    description,
    type,
    id,
    /* setOpenModalAddPlace,
    openModalAddPlace,
    websiteURL,
    daysOpen,
    hoursOpen,
    hoursClose, */
  } = props;
  const { user } = useContext(UserContext);
  /*   const [openModalDelete, setOpenModalDelete] = useState(false); */

  return (
    <>
      {/* {openModalAddPlace && (
        <ModalAddPlace
          setOpenModalAddPlace={setOpenModalAddPlace}
          name={name}
          address={address}
          postal={postal}
          city={city}
          pictureUrl={pictureUrl}
          description={description}
          type={type}
          id={id}
          websiteURL={websiteURL}
          daysOpen={daysOpen}
          hoursOpen={hoursOpen}
          hoursClose={hoursClose}
        />
      )} */}
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          {/* <button
            type="button"
            onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
          >
            <BiEditAlt width={40} />
          </button> */}
          <Typography variant="h5" className="text-center">
            {name}
          </Typography>
          {/* <button type="button" onClick={() => setOpenModalDelete(true)}>
            <AiOutlineDelete width={40} />
          </button> */}
        </CardHeader>
        <CardBody className="p-3 flex flex-col justify-between">
          <Typography className="text-center text-xl font-normal -pt-3">
            {goodWrittenType(type)}
          </Typography>
          <img
            src={pictureUrl ? pictureUrl : noImage}
            alt={name}
            className="h-[100px] w-[90%] m-auto bg-cover bg-center"
          />
          <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
            {description.slice(0, 60)}...
          </Typography>
          {user?.id && (
            <StarRating
              className="border-2 flex items-center justify-center cursor-default"
              userId={user?.id}
              poiId={id}
            />
          )}
          <Typography>
            <Link
              key={id}
              to={`/point-of-interest/${id}/${name}`}
              style={{ cursor: 'pointer' }}
            >
              <span className="text-xs text-blue-500 pt-3">
                Voir plus de détails
              </span>
            </Link>
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-1">
          <Typography variant="small" className="text-center text-xs">
            {`${address}, ${postal} ${city}`}
          </Typography>
        </CardFooter>
      </Card>
      {/* {openModalDelete && (
        <ModalConfirmDelete
          id={id}
          name={name}
          setOpenModalDelete={setOpenModalDelete}
          type={goodWrittenType(type)}
        />
      )} */}
    </>
  );
}
