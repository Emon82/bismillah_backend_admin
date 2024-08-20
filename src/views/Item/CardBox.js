import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const TotalProfit = ({title,count, icon}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="subtitle2"
          >
            {title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
          {count} {title === 'Total Balance' ? 'USD' : null }
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 30,
              width: 30
            }}
          >
            {icon}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;