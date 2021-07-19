import React from 'react';
import {
  Grid, Paper, Tab, Tabs, Hidden
} from '@material-ui/core';
import TabPanel from '../tab_panel';
import assignIdToTab from '../../helpers/assign_id_to_tab';
import { OffersListViewStyles } from './styles';
import NewOffersList from './new_offers_list';
import AppliedOffersList from './applied_offers_list';
import SavedOffersList from './saved_offers_list';

function OffersListView(): JSX.Element {
  const classes = OffersListViewStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

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
        <div className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs"
          >
            <Tab label="Nuevas ofertas" id={assignIdToTab(0).id} aria-controls={assignIdToTab(0)['aria-controls']} />
            <Tab label="Ofertas postuladas" id={assignIdToTab(1).id} aria-controls={assignIdToTab(1)['aria-controls']} />
            <Tab label="Ofertas guardadas" id={assignIdToTab(2).id} aria-controls={assignIdToTab(2)['aria-controls']} />
          </Tabs>
        </div>
        <TabPanel tabValue={value} index={0}>
          <NewOffersList />
        </TabPanel>
        <TabPanel tabValue={value} index={1}>
          <AppliedOffersList />
        </TabPanel>
        <TabPanel tabValue={value} index={2}>
          <SavedOffersList />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
export default OffersListView;
