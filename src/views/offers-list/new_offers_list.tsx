import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, GridList, GridListTile } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import ALL_JOB_OFFERS_OBJECTS from '../../queries/all-job-offers-objects.graphql';
import SAVED_JOB_OFFERS_IDS from '../../queries/saved-job-offers-ids.graphql';
import PostedApplicationCard from '../cards/posted_application_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { JobOfferDetailType } from '../../types/job-offer-query-types';

interface NewOffersListProps {
  width: Breakpoint,
}

function NewOffersList(props: NewOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<JobOfferDetailType[]>([]);
  const [savedOffersIds, setSavedOffersIds] = React.useState(new Set());

  interface AllJobOffersDataType {
    jobOffers: JobOfferDetailType[],
  }

  const {
    loading: allJobOffersLoading,
    error: allJobOffersError,
    data: allJobOffersData,
    refetch: allJobOffersRefetch,
  } = useQuery<AllJobOffersDataType>(ALL_JOB_OFFERS_OBJECTS, { notifyOnNetworkStatusChange: true });

  interface SavedJobOffersDataType {
    getSavedJobOffers: JobOfferDetailType[],
  }

  const {
    loading: savedJobOffersLoading,
    error: savedJobOffersError,
    data: savedJobOffersData,
    refetch: savedJobOffersRefetch,
  } = useQuery<SavedJobOffersDataType>(SAVED_JOB_OFFERS_IDS, {
    notifyOnNetworkStatusChange: true,
    variables: { getSavedJobOffersProfessionalId: '60ec604347a1c50003285e75' },
  });

  const classes = recruiterViewStyles();

  const { cols } = getCols(width);

  const handleSaveSuccess = (offerId: string) => {
    const savedIdsCopy = new Set(savedOffersIds);
    savedIdsCopy.add(offerId);
    setSavedOffersIds(savedIdsCopy);
  };

  const refetchAll = () => {
    const jobOffersObjectsPromise = allJobOffersRefetch();
    const savedJobOffersIdsPromise = savedJobOffersRefetch();
    Promise.all([jobOffersObjectsPromise, savedJobOffersIdsPromise]).then(() => {
      if (savedJobOffersData) {
        const newSavedIds = new Set(
          savedJobOffersData.getSavedJobOffers.map((jobOffer) => jobOffer.id),
        );
        setSavedOffersIds(newSavedIds);
      }
      if (allJobOffersData) setOffers(allJobOffersData.jobOffers);
    }).catch((error) => { throw (error); });
  };

  React.useEffect(() => {
    refetchAll();
  },
  [allJobOffersData, savedJobOffersData]);

  return (
    <>
      {allJobOffersLoading && <CircularProgress />}
      {!allJobOffersLoading && !offers.length && (
        <p>No hay nuevas ofertas actualmente.</p>
      )}
      <GridList className={classes.YgridList} cols={cols} cellHeight="auto" style={{ margin: 'auto' }}>
        {offers.map((jobOffer) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <PostedApplicationCard
              key={jobOffer.id}
              jobOffer={jobOffer}
              handleOpenDetails={() => { }}
              hideSaveButton={false}
              hideBadge
              onSaveSuccess={() => handleSaveSuccess(jobOffer.id)}
              isSaved={savedOffersIds.has(jobOffer.id)}
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default withWidth()(NewOffersList);
