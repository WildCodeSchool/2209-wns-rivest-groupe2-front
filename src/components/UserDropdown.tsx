import { useContext } from 'react';
import { Dropdown, Avatar } from "flowbite-react"
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../interfaces/IUserContext'
import redneck from '../asset/img/redneck.jpg';

const UserDropdown = () => {

  const { user, setUser } = useContext<IUserContext>(UserContext)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
  
  return (
    <Dropdown
      label={
        <Avatar
          alt="User settings"
          img={redneck}
          size="lg"
        />
      }
      arrowIcon={false}
      inline={true}
      className="z-50"
    >
      <Dropdown.Header>
        <span className="block text-sm text-opalblue">{user?.username}</span>
      </Dropdown.Header>
      <Dropdown.Item>Mon compte</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout}>Déconnexion</Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdown;
