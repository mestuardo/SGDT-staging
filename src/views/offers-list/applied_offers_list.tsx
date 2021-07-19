import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import APPLIED_JOB_OFFERS_OBJECTS from '../../queries/applied-job-offers-objects.graphql';
import PostedApplicationCard from '../cards/posted_application_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { JobOfferSummaryType } from '../../types/job-offer-query-types';

interface AppliedOffersListProps {
  width: Breakpoint,
}

function AppliedOffersList(props: AppliedOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<JobOfferSummaryType[]>([]);

  interface AppliedOffersDataType {
    getAppliedJobOffers: JobOfferSummaryType[],
  }

  const {
    loading, data,
  } = useQuery<AppliedOffersDataType>(APPLIED_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    variables: { getAppliedJobOffersProfessionalId: '60ec604347a1c50003285e75' },
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
            <PostedApplicationCard
              key={jobOffer.id}
              jobOffer={jobOffer}
              handleOpenDetails={() => {}}
              onSaveSuccess={() => {}}
              hideBadge
              hideSaveButton
              isSaved={false}
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(AppliedOffersList);
