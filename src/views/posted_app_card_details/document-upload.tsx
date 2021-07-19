import React from 'react';
import { Button, InputLabel } from '@material-ui/core';
import { useMutation, DocumentNode } from '@apollo/client';

import { documentUploadStyles } from './styles';
import { UploadDocumentType } from '../../types/upload-document-type';
import UPLOAD_CV_MUTATION from '../../mutations/uploadDocument.graphql';
import FILTER_APPLICATIONS from '../../queries/filter-applications.graphql';

interface UploadButtonProps{
  applicationId: string,
  jobOfferId: string,
}

export default function UploadButton(props: UploadButtonProps): JSX.Element {
  const { applicationId, jobOfferId } = props;
  const classes = documentUploadStyles();

  const [onSubmitHandler,
    { loading: mutationLoading, error: mutationError }] = useMutation<
  { uploadCV: UploadDocumentType }>(UPLOAD_CV_MUTATION);

  const newHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      await onSubmitHandler({
        variables: {
          document: event.target.files[0],
          documentApplicationId: applicationId,
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { jobOfferId },
        }],
      });
    }
  };

  if (mutationLoading) return <div>Loading...</div>;
  if (mutationError) return <div>{JSON.stringify(mutationError, null, 2)}</div>;

  return (
    <div className={classes.root}>
      <input
        accept=".doc,.docx,.pdf"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={newHandleChange}
      />
      <InputLabel htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Agregar referencias
        </Button>
      </InputLabel>
    </div>
  );
}
