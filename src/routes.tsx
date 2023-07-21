import {
  UserCircleIcon,
  UsersIcon,
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
        name: 'Mon profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: 'Utilisateurs et Rôles',
        path: '/tables',
        element: <Tables />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: 'Villes',
        path: '/cities',
        element: <Cities />,
      },
    ],
  },
];

export default routes;
