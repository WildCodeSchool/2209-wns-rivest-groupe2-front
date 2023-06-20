import { Routes, Route } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { Sidenav } from '../widgets/layout/sidenav';
import { DashboardNavbar } from '../widgets/layout/dashboard-navbar';
import { Configurator } from '../widgets/layout/configurator';
import { Footer } from '../widgets/layout/footer';
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
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
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

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
