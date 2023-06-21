import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
} from '@heroicons/react/24/solid';
import { DashboardHome } from './pages/dashboard/home';
import { Profile } from './pages/dashboard/profile';
import { Tables } from './pages/dashboard/tables';
import { Notifications } from './pages/dashboard/notifications';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '/',
        element: <DashboardHome />,
      },
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
        icon: <BellIcon {...icon} />,
        name: 'notifactions',
        path: '/notifactions',
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
