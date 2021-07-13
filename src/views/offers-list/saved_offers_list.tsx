import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import SAVED_JOB_OFFERS_OBJECTS from '../../queries/saved-job-offers-objects.graphql';
import PostedApplicationCard from '../cards/posted_application_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { JobOfferDetailType } from '../../types/job-offer-query-types';

interface SavedOffersListProps {
  width: Breakpoint,
}

function SavedOffersList(props: SavedOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<JobOfferDetailType[]>([]);

  interface SavedOffersDataType {
    getSavedJobOffers: JobOfferDetailType[],
  }

  const {
    loading, data, refetch,
  } = useQuery<SavedOffersDataType>(SAVED_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    variables: { getSavedJobOffersProfessionalId: '60e7cb10b2879c001142d330' },
  });
  const classes = recruiterViewStyles();

  const { cols } = getCols(width);

  React.useEffect(() => {
    const fetchOffers = () => {
      setOffers([]);
      refetch().then(() => {
        if (data && data.getSavedJobOffers) setOffers(data.getSavedJobOffers);
      }).catch((error) => console.log(error));
    };
    fetchOffers();
  },
  []);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && !offers.length && (
        <p>No tienes ofertas guardadas actualmente.</p>
      )}
      <GridList className={classes.YgridList} cols={cols} cellHeight="auto" style={{ margin: 'auto' }}>
        {offers.map((jobOffer) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <PostedApplicationCard
              key={jobOffer.id}
              jobOffer={jobOffer}
              hideBadge
              isSaved
              handleOpenDetails={() => { }}
              onSaveSuccess={() => { }}
              hideSaveButton={false}
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(SavedOffersList);
