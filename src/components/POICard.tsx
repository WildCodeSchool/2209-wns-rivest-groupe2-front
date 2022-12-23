import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

interface Props {
  name: string;
  address: string;
  pictureUrl: string;
  description: string;
}

export default function POICard(props: Props) {
  const { name, address, pictureUrl, description } = props;
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <Typography variant="h5" className="text-center">
          {name}
        </Typography>
      </CardHeader>
      <CardBody className="p-3 flex flex-col justify-between">
        <img
          src={pictureUrl}
          alt={name}
          className="h-[100px] bg-cover bg-center"
        />
        <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
          {description.slice(0, 54)}...
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-1">
        <Typography variant="small" className="text-center text-xs">
          {address}
        </Typography>
      </CardFooter>
    </Card>
  );
}
