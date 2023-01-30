import { useContext } from 'react';
import { Dropdown, Avatar } from "flowbite-react"
import { UserContext } from '../contexts/UserContext'

const UserDropdown = () => {

  const { user, setUser } = useContext(UserContext)

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
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded={true}
        />
      }
      arrowIcon={false}
      inline={true}
      className="z-50"
    >
      <Dropdown.Header>
        <span className="block text-sm">Pablo Escobar</span>
      </Dropdown.Header>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdown;
