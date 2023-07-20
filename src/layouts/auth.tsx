import { Routes, Route } from 'react-router-dom';
import { ChartPieIcon, UserIcon } from '@heroicons/react/24/solid';
import { Navbar } from '../widgets/layout/navbar.jsx';
import routes from '../routes';

export function Auth() {
  const navbarRoutes = [
    {
      name: 'dashboard',
      path: '/dashboard/home',
      icon: ChartPieIcon,
    },
    {
      name: 'profile',
      path: '/dashboard/home',
      icon: UserIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>
      <Routes>
        {routes.flatMap(({ layout, pages }) =>
          layout === 'dashboard'
            ? pages.map(({ path, element }) => (
                <Route path={path} element={element} />
              ))
            : []
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = '/src/layout/Auth.jsx';

export default Auth;
