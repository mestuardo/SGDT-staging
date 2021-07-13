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
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import drawerStyles from './styles';

interface Props {
  children: JSX.Element,
  window2: () => Window,
}

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function ClippedDrawer(props: Props): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  const { children, window2 } = props;
  const theme = useTheme();
  const classes = drawerStyles();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const redirectToIndex = () => router.push('/login');
  const redirectToPersonnelRequest = () => router.push('/personnel-request');
  const redirectToRecruitMentProcess = () => router.push('/recruitment-process');
  const handleLogOut = () => {
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl({ redirectUri: window.location.origin });
    }
  };
  const container = window2 !== undefined ? () => window2().document.body : undefined;
  const buttonsArray = [{
    key: 'incio',
    label: 'Inicio',
    func: redirectToIndex,
    icon: <HomeIcon />,
  },
  {
    key: 'personnel-request',
    label: 'Crear solicitud',
    func: redirectToPersonnelRequest,
    icon: <AssignmentIcon />,
  },
  {
    key: 'recruitment-process',
    label: 'Procesos activos',
    func: redirectToRecruitMentProcess,
    icon: <ViewQuiltIcon />,
  },
  ];
  const drawerContent = (
    <div className={classes.drawerContainer}>

      <List>
        {buttonsArray.map((btn) => (
          <ListItem button key={btn.key} onClick={btn.func}>
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
            {' '}
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
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                className={classes.iconStyle}
              >
                <NotificationsIcon />
              </IconButton>
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
          container={container}
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
