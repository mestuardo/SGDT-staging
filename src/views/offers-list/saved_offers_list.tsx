import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import SAVED_JOB_OFFERS_OBJECTS from '../../queries/saved-job-offers-objects.graphql';
import OfferCard from '../cards/offer_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import professionalId from '../../global-variables';

interface SavedOffersListProps {
  width: Breakpoint,
}

function SavedOffersList(props: SavedOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<ProfessionalJobOfferDetail[]>([]);

  interface SavedOffersDataType {
    getSavedJobOffers: ProfessionalJobOfferDetail[],
  }

  const {
    loading, data, refetch,
  } = useQuery<SavedOffersDataType>(SAVED_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { getSavedJobOffersProfessionalId: professionalId },
  });
  const classes = recruiterViewStyles();

  const fetchOffers = () => {
    setOffers([]);
    refetch().then((response) => {
      if (response.data && response.data.getSavedJobOffers) {
        setOffers(response.data.getSavedJobOffers);
      }
    }).catch((error) => { throw (error); });
  };

  const handleUnsaveSuccess = (jobOfferId: string) => {
    const offersCopy = offers.filter((jobOffer) => jobOffer.id !== jobOfferId);
    setOffers(offersCopy);
  };

  const { cols } = getCols(width);

  React.useEffect(() => {
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
            <OfferCard
              key={jobOffer.id}
              jobOffer={jobOffer}
              allowUnsave
              isSaved
              onUnsaveSuccess={() => handleUnsaveSuccess(jobOffer.id)}
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(SavedOffersList);
