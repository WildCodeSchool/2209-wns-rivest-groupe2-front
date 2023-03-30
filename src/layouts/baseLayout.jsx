import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <div style={{ marginBottom: '500px' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
