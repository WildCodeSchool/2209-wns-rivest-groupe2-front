import { Routes, Route } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { Sidenav } from '../widgets/layout/sidenav';
import { DashboardNavbar } from '../widgets/layout/dashboard-navbar';
import routes from '../routes';
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from '../contexts/index';

const initialState = {
  openSidenav: false,
  sidenavColor: 'blue',
  sidenavType: 'dark',
  transparentNavbar: true,
  fixedNavbar: false,
  openConfigurator: false,
};

type ControllerType = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

type ActionType = {
  type: string;
  value: any;
};

type DispatchType = (action: ActionType) => void;

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController() as [
    ControllerType,
    DispatchType
  ];
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === 'dark' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {
            routes.flatMap(({ layout, pages }) =>
              layout === 'dashboard'
                ? pages.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))
                : []
            ) as React.ReactNode[]
          }
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
