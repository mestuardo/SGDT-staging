import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { MessageType } from '../../types/message-types';

interface MessageCardProps {
  message: MessageType;
}

export default function MessageCard(props: MessageCardProps) : JSX.Element {
  const { message } = props;
  return (
    <Card
      variant="outlined"
      style={{
        maxWidth: '300px',
        textAlign: message.senderOptions === 'RECRUITER' ? 'right' : 'left',
        backgroundColor: message.senderOptions === 'RECRUITER' ? '#FFF7C8' : '#D3FFC8',
        margin: '8px',
        borderRadius: message.senderOptions === 'RECRUITER' ? '14px 14px 0 14px' : '14px 14px 14px 0px',
      }}
    >
      <CardContent>
        <Typography variant="body2" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">{`${message.senderName} `}</Box>
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">{`${message.senderOptions === 'RECRUITER' ? 'Reclutador ' : 'Área comercial'} `}</Box>
        </Typography>
        <Typography variant="caption" component="div">
          {new Date(message.createdAt).toLocaleString()}
        </Typography>
        <Typography style={{ textAlign: 'left' }} variant="caption" component="div">
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
