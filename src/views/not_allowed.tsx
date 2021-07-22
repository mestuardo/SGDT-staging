import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { OffersListViewStyles } from './offers-list/styles';

function NotAllowedView(): JSX.Element {
  const classes = OffersListViewStyles();

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      spacing={0}
    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <p>No tienes acceso a esta vista</p>
      </Grid>
    </Grid>
  );
}
export default NotAllowedView;
