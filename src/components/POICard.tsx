import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import noImage from '../asset/img/no-image-icon.png';

interface Props {
  name: string;
  address: string;
  postal: string;
  city: string;
  pictureUrl: string;
  description: string;
  type: string;
}

export default function POICard(props: Props) {
  const { name, address, postal, city, pictureUrl, description, type } = props;
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <Typography variant="h5" className="text-center">
          {name}
        </Typography>
      </CardHeader>
      <CardBody className="p-3 flex flex-col justify-between">
        <img
          src={pictureUrl ? pictureUrl : noImage}
          alt={name}
          className="h-[100px] w-[90%] m-auto bg-cover bg-center"
        />
        <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
          {description.slice(0, 60)}...
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-1">
        <Typography variant="small" className="text-center text-xs">
          {`${address}, ${postal} ${city}`}
        </Typography>
      </CardFooter>
    </Card>
  );
}
