import React from 'react';
import {Link} from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 120,
    width: 120
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  middleItem:{
    textAlign:'center',
    marginTop:"20px"
  }
}));

const Profile = ({admin}) => {
  const classes = useStyles();
  

  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={admin?.defautProfile}
          />
          <Typography
          style={{marginTop:"40px"}}
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {admin?.name}
        
          </Typography>
         
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {admin?.email}
          </Typography> 
          <Typography
            color="textSecondary"
            variant="body1"
            style={{marginBottom:"11px"}}
          >
            {admin?.phone}
          </Typography>

  
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={()=>alert('You can\'t upload. We will fix this issue as soon as possible')}
        >
          Upload picture
        </Button>
      </CardActions>
      <Divider /> */}
      <CardActions className={classes.middleItem}>
  
{/* 
 <Link to='/dashboard/delete-account' className={classes.linkStyle}>
   <Button variant="outlined" size="small" color="secondary">Delete Account</Button>
 </Link> */}
 </CardActions>
    </Card>
  );
};


export default Profile;