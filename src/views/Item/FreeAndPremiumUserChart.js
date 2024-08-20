import React, { useEffect, useContext } from "react";
import moment from "moment";
import { Line, Pie, Bar } from 'react-chartjs-2';
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import {Grid,Container,Card ,CardHeader,CardContent, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({


}))

const Chart=({weeklyRegister})=> {
  const classes= useStyles();


const dataFormate =
weeklyRegister?.length &&
weeklyRegister.map((t) => {
 
  return { days: moment(t.joined).format("ddd"), count: t.id };
});

const total =
dataFormate.length &&
dataFormate.reduce(
  (acc, item) => {
    if (item.days in acc) {
    
      return {
        ...acc,
        [item.days]: acc[item.days] + 1,
      };
    }
    // throw new Error('No Date Match Found');
  },
  {
    Sat: 0,
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
  }
);


const data = {
labels: total
  ? Object.keys(total)
  : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
 series: total ? Object.values(total) : [] ,
// series: [total ? Object.values(total) : [0, 0, 0, 0, 0, 0, 0]],
};
console.log(data)

// const series = Object.values(total)


const data2 = {
  labels:data.labels,
  datasets: [
    {
      label: 'Weekly Premium User Report',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      
      data: [10, 0, 5, 0, 4, 0, 0]
    }
  ],
};


  return (
    <div >
      <Grid   >
          <Card >
            <CardContent>
            <Line data={data2}  />
            </CardContent>
  
          </Card>
      </Grid>
     
    </div>
  );
}
export default Chart