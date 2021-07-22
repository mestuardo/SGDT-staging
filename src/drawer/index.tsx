import React from 'react';
import {
  CssBaseline,
  Drawer,
  AppBar,
  IconButton,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { userIsProfessional, checkIfAllowed } from '../helpers/roles';

import drawerStyles from './styles';
import ParsedTokenType from '../types/keycloak-token-type';

interface Props {
  children: JSX.Element,
}

export default function ClippedDrawer(props: Props): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const { children } = props;
  const theme = useTheme();
  const classes = drawerStyles();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const redirectTo = (path: string) => router.push(path);
  const handleLogOut = () => {
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl({ redirectUri: window.location.origin });
    }
  };
  const handleButtonColor = (pathname: string) => {
    if (process.browser) {
      if ((window.location.pathname === pathname) && (pathname === '/')) {
        return true;
      } if (window.location.pathname.includes(pathname) && (pathname !== '/')) {
        return true;
      }
    }
    return false;
  };
  const isProfessional = parsedToken && userIsProfessional(parsedToken);
  const isRecruiterChief = parsedToken && checkIfAllowed(parsedToken, ['recruiterChief']);

  const recruiterButtonsArray = [{
    key: 'incio',
    label: 'Inicio',
    pathname: '/',
    icon: <HomeIcon />,
  },
  {
    key: 'recruitment-process',
    label: 'Solicitudes',
    pathname: '/recruitment-process',
    icon: <ViewQuiltIcon />,
  },
  ];

  const recruiterChiefButtonsArray = [{
    key: 'incio',
    label: 'Inicio',
    pathname: '/login',
    icon: <HomeIcon />,
  },
  {
    key: 'personnel-request',
    label: 'Nueva solicitud',
    pathname: '/personnel-request',
    icon: <AssignmentIcon />,
  },
  {
    key: 'recruitment-process',
    label: 'Solicitudes',
    pathname: '/recruitment-process',
    icon: <ViewQuiltIcon />,
  },
  ];

  const professionalButtonsArray = [
    {
      key: 'ofertas',
      label: 'Ofertas',
      pathname: '/offers-list',
      icon: <HomeIcon />,
    },
    {
      key: 'perfil',
      label: 'Mi Perfil',
      pathname: '/professional-profile',
      icon: <FaceIcon />,
    },
  ];

  const recruitButtons = isRecruiterChief ? recruiterChiefButtonsArray : recruiterButtonsArray;
  const buttonsArray = isProfessional ? professionalButtonsArray : recruitButtons;

  const drawerContent = (
    <div className={classes.drawerContainer}>
      <div style={{ textAlign: 'center' }}>{parsedToken?.given_name}</div>
      <Divider />
      <List>
        {buttonsArray.map((btn) => (
          <ListItem
            button
            key={btn.key}
            onClick={() => redirectTo(btn.pathname)}
            selected={handleButtonColor(btn.pathname)}
          >
            <ListItemIcon>{btn.icon}</ListItemIcon>
            <ListItemText primary={btn.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />

          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </List>

    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
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
          </div>
          {keycloak?.authenticated || (keycloak && parsedToken) ? (
            <>
              {isProfessional
                ? (
                  <IconButton
                    className={classes.iconStyle}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => router.push('/professional-profile')}
                  >
                    <AccountCircle />
                  </IconButton>
                ) : null}
              <Hidden lgUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.iconStyle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </>
          ) : (
            <Link href="/login">
              <Typography variant="body2" className={classes.title} component="div">
                INICIAR SESIÓN
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          {keycloak?.authenticated || (keycloak && parsedToken) ? (

            drawerContent
          ) : null}
        </Drawer>
      </Hidden>

      {children}

    </div>
  );
}
