import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { updateAccount } from '../../redux/actions/adminAction';


const useStyles = makeStyles(() => ({
  root: {},
  formDesign: {
      margin:"5px"
  }
}));

const ProfileDetails = ({admin}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData]=useState({
    id: admin?.id,
    name: admin?.name,
    email: admin?.email,
    phone: admin?.phone,

});


const {id, name, email,phone,address, } = formData;


const onSubmit = () => {
  // e.preventDefault();

  dispatch(updateAccount({ 
    name,
    phone,
    email,

  }));
  }
  
  const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 
 

  return (
  
    <div>
      
    <form className={classes.form} >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent className={classes.formDesign}>
          <Grid
            container
            spacing={3}
          >
            
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <TextField
                size="small"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
                value={name}
                onChange={e=> onChange(e)}
              />
            </Grid>
         

        
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                type="number"
                variant="outlined"
                required
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={e=> onChange(e)}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={e=> onChange(e)}
              />
            </Grid> */}
          
          </Grid>
         
      
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={()=>onSubmit()}
          >
           Update
          </Button>
        </Box>
       
      </Card>
      </form>
      </div>
  );
};


export default ProfileDetails;