import React, { useContext, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import {
  AppBar,
  Slide,
  Box,
  Typography,
  Toolbar,
  IconButton,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from "../../api/index";
import Notification from '../../utlils/notification';
import AllApplicationErrorHandle from '../../utlils/allApplicationErrorHandle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {},
  customBar: {
    display: "flex",
  },
  activeColor: {
    backgroundColor: "#35ab8f",
  },

  addButton: {
    paddingBottom: "2px",
    textAlign: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "25px",
  },
}));
const PlanList = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [promUserId, setPromUserId] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [userList, setUserList] = useState([]);


// const DateCompare = (expairDate) => {
//   const todays = new Date();

//   const  expairDate = new Date();
//   if (g1.getTime() === g2.getTime())
//       document.write("Both  are equal");
//   else
//       document.write("Not equal")
// }

  const fetchAllUser = async () => {
    try {
      const result = await api.allUserListUrl();
     console.log(result)
 

      setUserList(result?.details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handlePermaneltlyPromotePopUp = (userId) => {
  setPromUserId(userId)
  handleClickOpen()   
}


const handlePermaneltlyPromote = () => {
    handleClose()
}



  const promoteSubmit = async () => {
    if(!promUserId){
      return alert('Something Wrong')
    }
    try {
      
      const result = await api.promotionUrl(promUserId);
      fetchAllUser();
      Notification("Activated", "success", 1000);
      handleClose()
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
      handleClose()
    }
  };

  const demoteSubmit = async (id) => {
    try {
      const result = await api.demoteUrl(id);
      fetchAllUser();
      Notification("Promotuon cancel", "success", 1000);
   
    } catch (error) {
      AllApplicationErrorHandle(error);
      console.log(error);
    }
  };

  return (
    <div>
      <MaterialTable
        title="User List"
        columns={[
          { title: "User Name", field: "name" },
          { title: "Email", field: "email" },
          // { title: "Phone", field: "phone" },
       
          // {
          //   title: "Expiry Date",
          //   editable: "false",
          //   field: "premiumTo",
          //   render: (rowData) =>
          //   rowData.premiumSince ? moment(rowData.premiumTo).format("D-M-YYYY, h:mm a") : null

          // },
          {
            title: "Premium",
            editable: "false",
            field: "scopes",
            render: (rowData) =>
             (<spam>{rowData?.scopes.includes('PREMIUM') ? 'YES' : 'NO'}</spam>)
          },
          {
            title: "Premium Since",
            editable: "false",
            field: "premiumSince",
            render: (rowData) =>
            rowData.premiumSince ? moment(rowData.premiumSince).format("D-M-YYYY") : null
              
          },

          {
            title: "Subscriber Type",
            editable: "false",
            field: "scopes",
            render: (rowData) =>
             (<div>
 
              
               {rowData?.scopes.includes('PREMIUM') && rowData.subscriptionId  && <span>Stripe</span> }
               {rowData?.scopes.includes('PREMIUM') && rowData.currentSslId  && <span>SSL</span> }
               {rowData?.scopes.includes('PREMIUM') && !rowData.currentSslId && !rowData.subscriptionId && <span>Promoted</span> }
               {/* {rowData?.scopes.includes('PREMIUM') && !rowData.currentSslId && !rowData.subscriptionId && <Button  color="secondary" variant="contained" size="small" onClick={()=>demoteSubmit(rowData.id)}>Demote</Button> }
               {!rowData?.scopes.includes('PREMIUM') && !rowData.currentSslId && !rowData.subscriptionId &&  <Button variant="contained" size="small" color="primary"  onClick={()=>handlePermaneltlyPromotePopUp(rowData.id)}>promote</Button> } */}
   
            </div>)
          },

          
          {
            title: "Make Promote",
            editable: "false",
            field: "scopes",
            render: (rowData) =>
             (<div>
 
{/*               
               {rowData?.scopes.includes('PREMIUM') && rowData.subscriptionId  && <span>Stripe Subscriber</span> }
               {rowData?.scopes.includes('PREMIUM') && rowData.currentSslId  && <span>SSL Subscriber</span> } */}
               {rowData?.scopes.includes('PREMIUM') && !rowData.currentSslId && !rowData.subscriptionId && <Button  style={{backgroundColor:"red", color:"white"}}
              
                variant="contained"
                size="small" onClick={()=>demoteSubmit(rowData.id)}> 
                 <CancelIcon
                  fontSize="small"
                  color="white"
                />
                
                </Button> }
               {!rowData?.scopes.includes('PREMIUM') && !rowData.currentSslId && !rowData.subscriptionId &&  <Button variant="contained" size="small" style={{backgroundColor:"green", color:"white"}}   onClick={()=>handlePermaneltlyPromotePopUp(rowData.id)}> 
               
               <CheckCircleIcon
                  fontSize="small"
                  color="white"
                />
                </Button> }
   
            </div>)
          },

   

        ]}
        data={userList}
   
     
        options={{
          actionsColumnIndex: -1,     
          pageSize: 12,
          pageSizeOptions:[12],
          padding: "dense",

        }}
    
      />


<Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">Do you want to promote this user</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    If you promote this user than he/she will get all premium members facilities.
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose} color="primary">
   No
  </Button>
  <Button  onClick={()=>promoteSubmit()} color="primary" autoFocus>
   Yes
  </Button>
</DialogActions>
</Dialog>

    </div>
  );
};

export default PlanList;
