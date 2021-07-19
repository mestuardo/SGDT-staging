import React from 'react';
import { Box, Typography } from '@material-ui/core';

type JobDescriptionFieldProps = {
  field: string;
  value: string;
};

const JobDescriptionField: React.FC<JobDescriptionFieldProps> = ({
  field,
  value,
}: JobDescriptionFieldProps) => (
  <Typography style={{marginBottom: 10}}>
    <Box fontWeight="fontWeightMedium" display="inline">
      {field}
      :
      {' '}
    </Box>
    {value}
  </Typography>
);

export default JobDescriptionField;
