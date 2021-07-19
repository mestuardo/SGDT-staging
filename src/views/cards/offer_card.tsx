import React from 'react';
import {
  Button,
  Card,
  CircularProgress,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import SAVE_JOB_OFFER from '../../mutations/saveJobOffer.graphql';
import UNSAVE_JOB_OFFER from '../../mutations/unsaveJobOffer.graphql';

import { offerCardStyles } from './styles';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import professionalId from '../../global-variables';

interface JobOfferCardProps{
  jobOffer: ProfessionalJobOfferDetail,
  openDetails?: () => void,
  allowSave?: boolean,
  allowUnsave?: boolean,
  onSaveSuccess?: () => void,
  onUnsaveSuccess?: () => void,
  isSaved?: boolean,
}

export default function OfferCard(props:JobOfferCardProps) : JSX.Element {
  const {
    jobOffer,
    openDetails,
    onSaveSuccess = () => {},
    onUnsaveSuccess = () => {},
    allowSave = false,
    allowUnsave = false,
    isSaved = false,
  } = props;
  const classes = offerCardStyles();

  const [saveOffer,
    { loading: saveOfferMutationLoading, error: saveOfferMutationError }] = useMutation(
    SAVE_JOB_OFFER,
  );
  const [unsaveOffer,
    { loading: unsaveOfferMutationLoading, error: unsaveOfferMutationError }] = useMutation(
    UNSAVE_JOB_OFFER,
  );

  const handleSave = () => {
    saveOffer({
      variables: {
        saveJobOfferProfessionalId: professionalId,
        saveJobOfferJobOfferId: jobOffer.id.toString(),
      },
    }).then(() => {
      if (saveOfferMutationError) throw (saveOfferMutationError);
      onSaveSuccess();
    }).catch((otherError) => {
      throw (otherError);
    });
  };

  const handleUnsave = () => {
    unsaveOffer({
      variables: {
        unsaveJobOfferProfessionalId: professionalId,
        unsaveJobOfferJobOfferId: jobOffer.id.toString(),
      },
    }).then(() => {
      if (unsaveOfferMutationError) throw (unsaveOfferMutationError);
      onUnsaveSuccess();
    }).catch((otherError) => {
      throw (otherError);
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openDetails}>
        <CardMedia
          component="img"
          height="100"
          image="https://cdn.givingcompass.org/wp-content/uploads/2019/03/26130148/Meet-the-People-Coding-Our-World.jpg"
          title="Example Image"
        />
      </CardActionArea>
      <CardContent onClick={openDetails} className={classes.content}>
        <Typography>
          {jobOffer.position}
        </Typography>
      </CardContent>
      {allowSave && (
        <CardActions>
          <Button size="small" color="primary" onClick={handleSave} disabled={isSaved}>
            {saveOfferMutationLoading ? <CircularProgress size={15} /> : 'Guardar'}
          </Button>
        </CardActions>
      )}
      {allowUnsave && (
        <CardActions>
          <Button size="small" color="primary" onClick={handleUnsave}>
            {unsaveOfferMutationLoading ? <CircularProgress size={15} /> : 'Eliminar'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

OfferCard.defaultProps = {
  allowSave: false,
  allowUnsave: false,
  isSaved: false,
  onSaveSuccess: () => {},
  onUnsaveSuccess: () => {},
  openDetails: () => {},
};
