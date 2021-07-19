import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import APPLIED_JOB_OFFERS_OBJECTS from '../../queries/applied-job-offers-objects.graphql';
import OfferCard from '../cards/offer_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import professionalId from '../../global-variables';

interface AppliedOffersListProps {
  width: Breakpoint,
}

function AppliedOffersList(props: AppliedOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<ProfessionalJobOfferDetail[]>([]);

  interface AppliedOffersDataType {
    getAppliedJobOffers: ProfessionalJobOfferDetail[],
  }

  const {
    loading, data,
  } = useQuery<AppliedOffersDataType>(APPLIED_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    variables: { getAppliedJobOffersProfessionalId: professionalId },
  });
  const classes = recruiterViewStyles();

  const { cols } = getCols(width);

  React.useEffect(() => {
    if (data) setOffers(data.getAppliedJobOffers);
  },
  [data]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && !offers.length && (
        <p>No hay ofertas postuladas actualmente.</p>
      )}
      <GridList className={classes.YgridList} cols={cols} cellHeight="auto" style={{ margin: 'auto' }}>
        {offers.map((jobOffer) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <OfferCard
              key={jobOffer.id}
              jobOffer={jobOffer}
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(AppliedOffersList);
