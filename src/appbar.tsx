import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import { useRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '10px',
    margin: 0,
    padding: 0,
  },
  appbar: {
    height: theme.spacing(6),
  },
  toolbar: {
    minHeight: theme.spacing(6),
  },
  icon: {
    margin: 0,

  },
  title: {
    cursor: 'pointer',
  },
  space: {
    flexGrow: 1,
  },
}));

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function MenuAppBar(): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  const classes = useStyles();
  const router: NextRouter = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePersonnelNewRequest = () => router.push('/personnel-request');
  const handleRecruitMentProcess = () => router.push('/recruitment-process');
  const handleLogOut = () => {
    setAnchorEl(null);
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl({ redirectUri: window.location.origin });
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          {keycloak?.authenticated || (keycloak && parsedToken) ? (
            <Link href="/login">
              <Typography variant="h6" className={classes.title} component="h6">
                SDGT
              </Typography>
            </Link>
          ) : (
            <Link href="/">
              <Typography variant="h6" className={classes.title} component="h6">
                SDGT
              </Typography>
            </Link>
          )}
          <div className={classes.space} />
          {keycloak?.authenticated || (keycloak && parsedToken) ? (
            <div>
              <IconButton
                className={classes.icon}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Typography variant="body2" className={classes.title} component="div">
                  {parsedToken?.given_name}
                </Typography>
              </IconButton>
              <IconButton
                className={classes.icon}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                className={classes.icon}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
              <IconButton
                className={classes.icon}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MailIcon />
              </IconButton>
              <IconButton
                edge="end"
                className={classes.icon}
                onClick={handleMenu}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handlePersonnelNewRequest}>Nueva Solicitud</MenuItem>
                <MenuItem onClick={handleRecruitMentProcess}>Procesos Activos</MenuItem>
                <MenuItem onClick={handleLogOut}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href="/login">
              <Typography variant="body2" className={classes.title} component="div">
                INICIAR SESIÓN
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
