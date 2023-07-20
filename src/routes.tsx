import {
  UserCircleIcon,
  TableCellsIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/solid';
import { Profile } from './pages/Dashboard/Profile';
import { Tables } from './pages/Dashboard/Tables';
import Cities from './pages/Dashboard/Cities';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'tables',
        path: '/tables',
        element: <Tables />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: 'cities',
        path: '/cities',
        element: <Cities />,
      },
    ],
  },
];

export default routes;
