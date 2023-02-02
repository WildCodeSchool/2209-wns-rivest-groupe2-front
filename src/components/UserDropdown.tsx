import { useContext } from 'react';
import { Dropdown, Avatar } from 'flowbite-react';
import { UserContext } from '../contexts/userContext';
import { IUserContext } from '../types/IUserContext';
import { Link } from 'react-router-dom';
import redneck from '../asset/img/redneck.jpg';

const UserDropdown = () => {
  // CATCH ID FROM USERCONTEXT
  const { user, setUser } = useContext<IUserContext>(UserContext);
  const id = user?.id;

  // FN LOGOUT TO CLEAR LOCAL STORAGE
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Dropdown
      label={<Avatar alt="User settings" img={redneck} size="lg" />}
      arrowIcon={false}
      inline={true}
      className="z-50"
    >
      <Dropdown.Header>
        <span className="block text-sm text-opalblue">{user?.username}</span>
      </Dropdown.Header>
      <Dropdown.Item>
        <Link to={`/dashboard/profile/`}>Mon compte</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout}>Déconnexion</Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdown;
