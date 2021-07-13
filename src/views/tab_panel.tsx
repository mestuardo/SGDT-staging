import React from 'react';
import { Box } from '@material-ui/core';

interface TabPanelProps {
  children: React.ReactNode,
  index: number,
  tabValue: number,
}

export default function TabPanel(props: TabPanelProps) : JSX.Element {
  const {
    children, tabValue, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {tabValue === index && (
      <Box p={3}>
        {children}
      </Box>
      )}
    </div>
  );
}
