import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
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
    { error: unsaveOfferMutationError }] = useMutation(
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
      <CardActions style={{ justifyContent: 'center', padding: 0 }}>
        {allowSave && (
          <IconButton onClick={handleSave} disabled={isSaved} color={saveOfferMutationLoading ? 'secondary' : 'primary'}>
            <AddCircle />
          </IconButton>
        )}
        {allowUnsave && (
          <IconButton onClick={handleUnsave}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
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
