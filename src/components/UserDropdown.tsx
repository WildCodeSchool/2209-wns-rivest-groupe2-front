import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { IUserContext } from '../types/IUserContext';
import { Link } from 'react-router-dom';
import defaultImage from '../asset/img/image-de-lutilisateur.png';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';

const UserDropdown = () => {
  const { user, setUser } = useContext<IUserContext>(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const image_url = process.env.REACT_APP_IMAGE_URL;

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
          sx={{
            width: 80,
            height: 80,
            border: '2px solid rgba(139, 139, 139)',
            borderRadius: '100%',
          }}
          src={
            user?.profilePicture && user.profilePicture.length > 0
              ? `${image_url}${user.profilePicture}`
              : defaultImage
          }
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
  );
};

export default UserDropdown;
