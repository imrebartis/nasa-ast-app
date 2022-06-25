import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageHeading() {
  return (
    <Box mt={4} mb={6}>
      <Typography color='secondary' variant='h1' sx={{ fontSize: 48 }}>
        Earth's nearby asteroids
      </Typography>
      <Typography color='secondary' variant='h2' sx={{ fontSize: 34 }}>
        (start date and end date can be changed below)
      </Typography>
    </Box>
  );
}
