import { Typography, makeStyles, Grid, Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import moment from "moment";
import * as api from "../../api/index";
import convertAvatarUrl from '../../utlils/convertAvatarUrl'
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: "10px",
  },
  avatarSize: {
    height: "150px",
    width: "150px",
    margin: "auto",
    padding: "5px",
  },
  grids: {
    paddingBottom: "30px",
  },
  head: {
    fontSize: "25px",
    fontWeight: 500,
    textAlign: "center",
  },
}));
const UserProfileDetails = ({ profileId }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);

  const fetchProfileDetails = async (id) => {
    try {
      const result = await api.profileDetailsUrl(id);
      console.log(result);
      if (result.code === 200) {
        setProfile(result.details)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileDetails(profileId);
  }, []);
console.log(convertAvatarUrl(profile?.avatar))
  return (
    <div className={classes.root}>
      <Grid container>
        <Avatar alt="Cindy Baker" src={convertAvatarUrl(profile?.avatar)} className={classes.avatarSize} />
      </Grid>
      <Grid>
        <Typography className={classes.head}>Profile Details</Typography>
      </Grid>

     


      <Grid container>
         <Grid item md={12} sm={12} xs={12} style={{border:"1px",backgroundColor:'#DEDEDE'}}>
         <Typography variant="h5">Basic </Typography> 
          </Grid>
        <Grid item md={6} sm={6} xs={12}>
        < Typography>RelationShip: {profile?.relationship} </Typography>
        <Typography>Last Name: {profile?.lastName} </Typography>
          <Typography>Gender: {profile?.gender} </Typography>
          <Typography>Birth Date: { moment(profile?.birthDate).format("D-MM-YYYY")}</Typography>
    
          <Typography>Marital Status: {profile?.maritalStatus} </Typography>
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
            <Typography>First Name: {profile?.firstName} </Typography>
            <Typography>Gender: {profile?.gender} </Typography>
            <Typography>Religion: {profile?.religion} </Typography>
       
        </Grid>
      </Grid>



      <Grid container>
         <Grid item md={12} sm={12} xs={12} style={{border:"1px",backgroundColor:'#DEDEDE'}}>
         <Typography variant="h5"> Address </Typography> 
          </Grid>
        <Grid item md={6} sm={6} xs={12}>
        <Typography>Contact: {profile?.contact} </Typography>
        <Typography>Country: {profile?.country} </Typography>
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
        <Typography>City: {profile?.city} </Typography>
          
          
       
        </Grid>
      </Grid>


      <Grid container>
         <Grid item md={12} sm={12} xs={12} style={{border:"1px",backgroundColor:'#DEDEDE'}}>
         <Typography variant="h5">Education And Career</Typography> 
          </Grid>
        <Grid item md={6} sm={6} xs={12}>
        <Typography>Institute Name: {profile?.institute} </Typography>
        <Typography>Profession: {profile?.profession} </Typography>
        <Typography>Company Name: {profile?.companyName} </Typography>
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
        <Typography>Degree: {profile?.degree} </Typography>
        <Typography>Designation: {profile?.designation} </Typography>
          
        <Typography>Annual Income: {profile?.income} </Typography>
       
        </Grid>
      </Grid> 


      <Grid container>
         <Grid item md={12} sm={12} xs={12} style={{border:"1px",backgroundColor:'#DEDEDE'}} >
         <Typography variant="h5">Life Style</Typography> 

          </Grid>
        <Grid item md={6} sm={6} xs={12}>
        <Typography>Diet: {profile?.diet} </Typography>
        <Typography>Smoke: {profile?.smoke ? 'Yes' : 'No'} </Typography>
        <Typography>Body Type: {profile?.bodyType} </Typography>
        <Typography>Height: {profile?.height} </Typography>
        
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
        <Typography>Weight: {profile?.weight} (cm or feet) </Typography>
        <Typography>Drink: {profile?.drink ? 'Yes' : 'No'} </Typography>
          
        <Typography>Skin Tone: {profile?.skinTone} </Typography>
       
        </Grid>
      </Grid> 

    </div>
  );
};

export default UserProfileDetails;
