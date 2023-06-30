import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { IUserContext } from '../types/IUserContext';
import { Link } from 'react-router-dom';
import redneck from '../asset/img/redneck.jpg';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const UserDropdown = () => {
  // CATCH ID FROM USERCONTEXT
  const { user, setUser } = useContext<IUserContext>(UserContext);
  const id = user?.id;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // FN LOGOUT TO CLEAR LOCAL STORAGE
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="large"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          alt={user?.username || user?.email}
          sx={{ width: 80, height: 80 }}
          src={redneck}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user?.username && (
          <MenuItem
            sx={{
              cursor: 'default',
              color: 'rgb(68, 189, 190)',
            }}
          >
            {user?.username}
          </MenuItem>
        )}
        <MenuItem>
          <Avatar /> <Link to={`/dashboard/profile/`}>Mon compte</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </React.Fragment>
    /* <Dropdown
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
    </Dropdown> */
  );
};

export default UserDropdown;
