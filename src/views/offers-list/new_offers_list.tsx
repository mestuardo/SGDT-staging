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
    refetch: savedJobOffersRefetch,
  } = useQuery<SavedJobOffersDataType>(SAVED_JOB_OFFERS_IDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { getSavedJobOffersProfessionalId: professionalId },
  });

  const {
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

  const refetchAll = () => {
    const jobOffersObjectsPromise = allJobOffersRefetch();
    const savedJobOffersIdsPromise = savedJobOffersRefetch();
    const appliedSavedJobOffersIdsPromise = appliedJobOffersRefetch();
    Promise.all([
      jobOffersObjectsPromise, appliedSavedJobOffersIdsPromise, savedJobOffersIdsPromise,
    ]).then(([allJobOffersResponse, appliedJobOffersResponse, savedJobOffersResponse]) => {
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

  React.useEffect(() => {
    refetchAll();
  },
  []);

  const loadingOrRefetching = allJobOffersLoading
    || allJobOffersNetworkStatus === NetworkStatus.refetch;

  const filteredOffers = offers.filter((jobOffer) => !appliedOffersIds.has(jobOffer.id));

  return (
    <>
      {loadingOrRefetching && <CircularProgress />}
      {!loadingOrRefetching && !filteredOffers.length && (
        <p>No hay nuevas ofertas actualmente.</p>
      )}
      <GridList className={classes.YgridList} cols={cols} cellHeight="auto" style={{ margin: 'auto' }}>
        {filteredOffers.map((jobOffer) => (
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
