import React, { useEffect, useContext } from "react";
import {  Pie } from 'react-chartjs-2';
import { makeStyles } from "@material-ui/core/styles";
import {Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({


}))

const Chart=({weeklyRegister})=> {
  const classes= useStyles();


const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
  return (
      <Grid style={{height: '100%'}} >
         
            <Pie data={data}  />
  
      </Grid>

  );
}
export default Chart