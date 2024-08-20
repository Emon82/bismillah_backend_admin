import {
  AppBar,
  Button,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Slide,
  TextareaAutosize,
  Toolbar
} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from '@material-ui/icons/Description';
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ViewDetails from "../../ViewUserDetails/UserDetails";
// import ViewDetails from "../../ViewUserDetails/EtibaleProfile.js";
import * as api from "../../../api/index";
import AllApplicationErrorHandle from '../../../utlils/allApplicationErrorHandle';
import Notification from '../../../utlils/notification';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  actionButton : {
    marginRight: '3px'
  },
  paper: {
    textAlign: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
  },
  modalButton: {
    
    marginTop: '8px'
  }
}));


const Transition2 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PendingUserList = () => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModal] = React.useState(false);
  const [openView, setOpenView] = useState(false);
  const [pendingProfile, setPendingProfile] = useState([])
  const [profileId, setProfileId] = useState('')
  const [profileStatus, setProfileStatus] = useState(null)
  const [modalStyle] = React.useState(getModalStyle);
  
  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleModalOpen = (id) => {
    setProfileId(id)
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

    // fetch 
    const fetch = async () => {
      const pendingList = await api.approvalListUrl();
      console.log(pendingList)
      if (pendingList.code === 200) {
        setPendingProfile(pendingList.details);
      }
    };


    const approveProfileHandle = async (profileId) => {
      try {
        const result = await api.approveUrl(profileId);
        console.log(result);
        Notification("Approve Success","success",1000)
        fetch()
      
      } catch (error) {
        AllApplicationErrorHandle(error)
        console.log(error);
      }
    };

    const disApproveProfileHandle = async () => {
      console.log(profileId, profileStatus)
      if(profileStatus === ''){
        Notification("Please Enter Rezone","danger",1000)

      }
      Notification("Reject","success",1000)
      try {
         const result = await api.disapproveUrl(profileId,profileStatus);
        console.log(result);
        Notification("Reject","success",1000)
        fetch()
        handleModalClose()
     
      } catch (error) {
        AllApplicationErrorHandle(error)
        console.log(error);
      }
    };



  useEffect(() => {
    fetch()
  }, []);


  return (
    <div>

      <Dialog
        fullScreen
        open={openView}
        onClose={handleCloseView}
        TransitionComponent={Transition2}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseView}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ViewDetails profileId= {profileId} />
      </Dialog>

      <MaterialTable
        title="Pending Profile List"
        columns={[
          {
            title: "Date",
            field: "created",
            render: (rowData) =>
              moment(rowData.created).format("D-M-YYYY, h:mm a"),
          },
          { title: "Name", editable: "false", field: "firstName" },

          {
            title: "Country",
            field: "country",
          },
          {
            title: "Status",
            field: 'approval',
            lookup:{Awaiting:'Awaiting',Approved: 'Approved'},
            
          },
  

        ]}
        data={pendingProfile}
        actions={[
          (rowData) => ({
              icon: () => (
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="primary">
                  <DescriptionIcon fontSize="small" color="white" />
                </Button>
              ),
              tooltip: 'View Profile',
              onClick: (event, rowData) =>{
                setProfileId(rowData.id);
                 handleClickOpenView();
              },
          }),

          (rowData) => ({
            icon: () => (
              <Button
              style={{backgroundColor:"green", color:"white"}}
                fullWidth={true}
                variant="contained"
                color="success">
                <CheckCircleIcon
                  fontSize="small"
                  color="white"
                />
              </Button>
            ),
            tooltip: 'Approve',
            onClick: (event, rowData) => (
              // confirm('You want to approve' + '' + rowData.firstName),
              approveProfileHandle(rowData.id)
            ),
    
          }),
          (rowData) => ({
            icon: () => (
              <Button
                fullWidth={true}
                variant="contained"
                color="secondary">
                <CancelIcon
                  fontSize="small"
                  color="white"
                />
              </Button>
            ),
            tooltip: 'Reject Profile',
            onClick: (event, rowData) => (
            handleModalOpen(rowData.id)
            ),
    
          }),
        ]}
  
        options={{
          actionsColumnIndex: -1,     
          pageSize: 12,
          pageSizeOptions:[12],
          padding: "dense",

        }}
        components={{
          Toolbar: (props) => (
            <Grid container>
              <Grid item md={12} sm={12}>
                <MTableToolbar {...props} />
              </Grid>

            </Grid>
          ),
        }}
      />

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
      <h5 id="simple-modal-title">Why Reject</h5>
      <CardContent>
      <TextareaAutosize
      style={{height:"100px", width:"100%"}}
       
       placeholder="Enter Reason" 
       required
       type="text"
                          
                
                value={profileStatus}
                onChange={(e)=>setProfileStatus(e.target.value)}
              />
         
         
            <Button variant="contained" color="primary" className={classes.modalButton} onClick={()=>disApproveProfileHandle()} >
 Submit
</Button>

      </CardContent>
  
          
           
   
    </div>
      </Modal>
    </div>
  );
};

export default PendingUserList;
