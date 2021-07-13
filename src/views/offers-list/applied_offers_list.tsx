import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import APPLIED_JOB_OFFERS_OBJECTS from '../../queries/applied-job-offers-objects.graphql';
import PostedApplicationCard from '../cards/posted_application_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { JobOfferDetailType } from '../../types/job-offer-query-types';

interface AppliedOffersListProps {
  width: Breakpoint,
}

function AppliedOffersList(props: AppliedOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<JobOfferDetailType[]>([]);

  interface AppliedOffersDataType {
    getAppliedJobOffers: JobOfferDetailType[],
  }

  const {
    loading, data,
  } = useQuery<AppliedOffersDataType>(APPLIED_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    variables: { getAppliedJobOffersProfessionalId: '60e7cb10b2879c001142d330' },
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
        {offers.map((jobOffer, index) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <PostedApplicationCard
              key={jobOffer.id}
              id={index}
              jobOffer={jobOffer}
              hideBadge
              hideSaveButton
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(AppliedOffersList);
