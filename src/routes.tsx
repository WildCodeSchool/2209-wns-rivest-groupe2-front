import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';
import { Profile } from './pages/dashboard/profile';
import { Tables } from './pages/dashboard/tables';

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
    ],
  },
];

export default routes;