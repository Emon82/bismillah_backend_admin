import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { changePassword } from '../../redux/actions/adminAction';
import Notification from '../../utlils/notification'

const SettingsPassword = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
const handleSubmit = () => {
  if(!values.currentPass){
    return Notification("Enter Current Password", "info", 1000);
   }

  if(values.newPass !== values.confirmPass){
   return Notification("Password Not Match", "info", 1000);
  }
  dispatch(changePassword(values))
}


  return (
    <form >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            size="small"
            label="Current Password"
            margin="normal"
            name="currentPass"
            onChange={handleChange}
            type="password"
            value={values.currentPass}
            variant="outlined"
          />
             <TextField
            fullWidth
            size="small"
            label="New Password"
            margin="normal"
            name="newPass"
            onChange={handleChange}
            type="password"
            value={values.newPass}
            variant="outlined"
          />
          <TextField
            fullWidth
            size="small"
            label="Confirm password"
            margin="normal"
            name="confirmPass"
            onChange={handleChange}
            type="password"
            value={values.confirmPass}
            variant="outlined"
          />
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
            onClick={()=>handleSubmit()}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;