import React from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import {
  CircularProgress, GridList, GridListTile,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import ALL_JOB_OFFERS_OBJECTS from '../../queries/all-job-offers-objects.graphql';
import SAVED_JOB_OFFERS_IDS from '../../queries/saved-job-offers-ids.graphql';
import APPLIED_JOB_OFFERS_IDS from '../../queries/applied-job-offers-ids.graphql';
import OfferCard from '../cards/offer_card';
import recruiterViewStyles from '../recruiter_view/styles';
import getCols from '../../helpers/get_columns_helper';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import ApplyOfferDialog from './apply_offer_dialog';
import professionalId from '../../global-variables';

interface NewOffersListProps {
  width: Breakpoint,
}

function NewOffersList(props: NewOffersListProps) {
  const { width } = props;
  const [offers, setOffers] = React.useState<ProfessionalJobOfferDetail[]>([]);
  const [savedOffersIds, setSavedOffersIds] = React.useState(new Set());
  const [appliedOffersIds, setAppliedOffersIds] = React.useState(new Set());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedJobOffer, setSelectedJobOffer] = React.useState<(
  ProfessionalJobOfferDetail | undefined
  )>(
    undefined,
    );

  interface AllJobOffersDataType {
    jobOffers: ProfessionalJobOfferDetail[],
  }

  const {
    loading: allJobOffersLoading,
    // error: allJobOffersError,
    data: allJobOffersData,
    refetch: allJobOffersRefetch,
    networkStatus: allJobOffersNetworkStatus,
  } = useQuery<AllJobOffersDataType>(ALL_JOB_OFFERS_OBJECTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  interface SavedJobOffersDataType {
    getSavedJobOffers: ProfessionalJobOfferDetail[],
  }

  interface AppliedJobOffersDataType {
    getAppliedJobOffers: ProfessionalJobOfferDetail[],
  }

  const {
    /*
    loading: savedJobOffersLoading,
    error: savedJobOffersError,
    */
    data: savedJobOffersData,
    refetch: savedJobOffersRefetch,
  } = useQuery<SavedJobOffersDataType>(SAVED_JOB_OFFERS_IDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { getSavedJobOffersProfessionalId: professionalId },
  });

  const {
    /*
    loading: appliedJobOffersLoading,
    error: appliedJobOffersError,
    */
    data: appliedJobOffersData,
    refetch: appliedJobOffersRefetch,
  } = useQuery<AppliedJobOffersDataType>(APPLIED_JOB_OFFERS_IDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { getAppliedJobOffersProfessionalId: professionalId },
  });

  const classes = recruiterViewStyles();

  const { cols } = getCols(width);

  const handleOpenDialog = (jobOffer: ProfessionalJobOfferDetail) => {
    setSelectedJobOffer(jobOffer);
    setOpenDialog(true);
  };

  const handleSaveSuccess = (offerId: string) => {
    const savedIdsCopy = new Set(savedOffersIds);
    savedIdsCopy.add(offerId);
    setSavedOffersIds(savedIdsCopy);
  };

  const handleApplySuccess = (offerId: string) => {
    const appliedIdsCopy = new Set(appliedOffersIds);
    appliedIdsCopy.add(offerId);
    setAppliedOffersIds(appliedIdsCopy);
  };

  /*
  React.useEffect(() => {
    if (savedJobOffersData && savedJobOffersData.getSavedJobOffers) {
      const newSavedIds = new Set(
        savedJobOffersData.getSavedJobOffers.map((jobOffer) => jobOffer.id),
      );
      setSavedOffersIds(newSavedIds);
    }
  }, [savedJobOffersData, savedOffersIds]);
  */

  const refetchAll = () => {
    console.log('Gonna refetch all');
    const jobOffersObjectsPromise = allJobOffersRefetch();
    const savedJobOffersIdsPromise = savedJobOffersRefetch();
    const appliedSavedJobOffersIdsPromise = appliedJobOffersRefetch();
    Promise.all([
      jobOffersObjectsPromise, appliedSavedJobOffersIdsPromise, savedJobOffersIdsPromise,
    ]).then(([allJobOffersResponse, appliedJobOffersResponse, savedJobOffersResponse]) => {
      console.log('allJobOffersData', allJobOffersResponse);
      console.log('appliedJobOffersData', appliedJobOffersResponse);
      console.log('savedJobOffersData', savedJobOffersResponse);
      if (savedJobOffersResponse.data) {
        const newSavedIds = new Set(
          savedJobOffersResponse.data.getSavedJobOffers.map((jobOffer) => jobOffer.id),
        );
        setSavedOffersIds(newSavedIds);
      }
      if (allJobOffersResponse.data) {
        setOffers(allJobOffersResponse.data.jobOffers);
      }
      if (appliedJobOffersResponse.data) {
        const newAppliedJobOffersIds = new Set(
          appliedJobOffersResponse.data.getAppliedJobOffers.map(
            (jobOffer: ProfessionalJobOfferDetail) => jobOffer.id,
          ),
        );
        setAppliedOffersIds(newAppliedJobOffersIds);
      }
    }).catch((error) => { throw (error); });
  };

  React.useEffect(() => {
    refetchAll();
  },
  []);

  const loadingOrRefetching = allJobOffersLoading
    || allJobOffersNetworkStatus === NetworkStatus.refetch;

  return (
    <>
      {allJobOffersNetworkStatus === NetworkStatus.refetch && <p>Refetching</p>}
      {loadingOrRefetching && <CircularProgress />}
      {!loadingOrRefetching && !offers.length && (
        <p>No hay nuevas ofertas actualmente.</p>
      )}
      <GridList className={classes.YgridList} cols={cols} cellHeight="auto" style={{ margin: 'auto' }}>
        {offers.filter((jobOffer) => !appliedOffersIds.has(jobOffer.id)).map((jobOffer) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <OfferCard
              key={jobOffer.id}
              jobOffer={jobOffer}
              openDetails={() => handleOpenDialog(jobOffer)}
              allowSave
              onSaveSuccess={() => handleSaveSuccess(jobOffer.id)}
              isSaved={savedOffersIds.has(jobOffer.id)}
            />
          </GridListTile>
        ))}
      </GridList>
      {selectedJobOffer && (
        <ApplyOfferDialog
          openDialog={openDialog}
          notifyApplied={() => handleApplySuccess(selectedJobOffer.id)}
          closeDialog={() => setOpenDialog(false)}
          jobOffer={selectedJobOffer}
        />
      )}
    </>
  );
}

export default withWidth()(NewOffersList);
