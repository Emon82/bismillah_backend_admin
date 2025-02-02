import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { indigo } from '@material-ui/core/colors';

const Country = ({title,count, icon}) => (
  <Card sx={{ height: '100%' }}>
     <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Country Name</TableCell>
           
            <TableCell align="right">Total Profile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {
                
                
                count.map((row)=>(
                    <TableRow key={row.name}>
                    <TableCell  component="th" scope="row">
                      {row.country}
                    </TableCell>
       
                    <TableCell align="right">{row?.count?.id}</TableCell>
                  </TableRow>
                ))
            }
          {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
);

export default Country;