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
    <Card style={{ alignContent: 'left' }}>
      <CardContent>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">{`${message.senderName} `}</Box>
          {new Date(message.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" component="div">
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
