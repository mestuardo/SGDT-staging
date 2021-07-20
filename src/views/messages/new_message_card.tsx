import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useMutation, DocumentNode } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';

import ParsedTokenType from '../../types/keycloak-token-type';
import CREATE_NEW_MESSAGE from '../../mutations/create-message.graphql';
import JOB_OFFER_DETAILS from '../../queries/job-offer-details.graphql';

interface NewMessageCardProps{
  jobOfferId: string,
}

export default function NewMessageCard(props: NewMessageCardProps): JSX.Element {
  const { jobOfferId } = props;
  const [msg, setMsg] = React.useState<string>('');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;

  const [createMessage,
    { loading: createMessageLoading, error: createMessageError }] = useMutation(CREATE_NEW_MESSAGE);

  const handleSendMessage = async () => {
    await createMessage({
      variables: {
        jobOfferId,
        messageBody: msg,
        senderName: `${parsedToken.given_name} ${parsedToken.family_name}`,
        senderOptions: 'RECRUITER',
      },
      refetchQueries: [{
        query: JOB_OFFER_DETAILS as DocumentNode,
        variables: { getJobOfferId: jobOfferId },
      }],
    });
    setMsg('');
  };

  return (
    <div style={{
      display: 'grid',
    }}
    >
      <TextField
        style={{ width: '70%', justifySelf: 'center' }}
        label="Mensaje"
        margin="normal"
        multiline
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={2}
        variant="outlined"
        inputProps={{ style: { fontSize: 'small' } }}
      />
      <Button
        style={{ margin: 'auto' }}
        variant="outlined"
        onClick={handleSendMessage}
        disabled={(createMessageLoading)}
      >
        Enviar
        {' '}
        {createMessageLoading && <CircularProgress size={15} />}
        {createMessageError && <CancelIcon color="error" />}
      </Button>
    </div>
  );
}
