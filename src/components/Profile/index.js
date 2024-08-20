import React from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';
import Profile from './profile';
import ProfileDetails from './profileDetails';
import { useSelector } from 'react-redux'
import ChangePassword from './changePassword'

const Index = () => {
    const admin = useSelector((state) => state.adminState.admin);
  return (
   
      <Container maxWidth="lg" >
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
               <ProfileDetails admin={admin}/>
          
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
             <Profile admin={admin}/>
          </Grid>
     

          <Grid   item
           lg={12}
           lg={12}
           md={12}
           xs={12}
           >
        <ChangePassword/>
        </Grid>
        
        </Grid>

      
       
      </Container>
   
  );
};

export default Index;