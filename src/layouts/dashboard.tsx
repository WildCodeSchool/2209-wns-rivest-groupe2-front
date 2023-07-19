import { Routes, Route } from 'react-router-dom';
import { Sidenav } from '../widgets/layout/sidenav.jsx';
import { DashboardNavbar } from '../widgets/layout/dashboard-navbar.jsx';
import routes from '../routes';
import { useMaterialTailwindController } from '../contexts/index.jsx';

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
