import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import {
  makeStyles,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  IconButton,
  Slide,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description"
import RedoIcon from '@material-ui/icons/Redo';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from "@material-ui/icons/Close";
import * as api from "../../../api/index";
import ViewDetails from "../../ViewUserDetails/UserDetails";
import Notification from '../../../utlils/notification';
import AllApplicationErrorHandle from '../../../utlils/allApplicationErrorHandle';

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition2 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BandList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [profileId, setProfileId] = useState('')
  const [banList, setBanList] = useState([]);

  const fetch = async () => {
try {
  const result = await api.banListUrl();
  setBanList(result.details);
} catch (error) {
  console.log(error)
  
}
  };
  const unBanReqHandle = async (id) => {
    try {
      const result = await api.userUnBanReqUrl(id);
      const newList = banList.filter((list) => list.userId === result.id);
      Notification("Unban Success","success",1000)
      setBanList(newList);
      fetch();
    } catch (error) {
      AllApplicationErrorHandle(error)
      console.log(error);
    }
  };

  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  useEffect(() => {
    fetch();
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
        title="Report List"
        columns={[
          {
            title: "Date",
            editable: "false",
            field: "created",
            render: (rowData) =>
              moment(rowData.created).format("D-M-YYYY, h:mm a"),
          },
          { title: "Name", field: "name" },

          {
            title: "Email",
            field: "email",
          },
          // {
          //   title: "Report Type",
          //   field: "reportType",
          // },
  
       
        ]}
        data={banList}
        actions={[
          (rowData) => ({
            icon: () => (
              <Button fullWidth={true} variant="contained" color="primary">
                <DescriptionIcon fontSize="small" color="white" />
              </Button>
            ),
            tooltip: "View Profile",
            onClick: (event, rowData) => {
              setProfileId(rowData.reportedProfile);
              handleClickOpenView();
            },
          }),

          (rowData) => ({
            icon: () => (
              <Button
              color="primary"
                fullWidth={true}
                variant="contained"

              >
                <RedoIcon fontSize="small" />
              </Button>
            ),
            tooltip: "Profile Unban",
            onClick: (event, rowData) => (
              // confirm("You want to unban "),
              unBanReqHandle(rowData.id)
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
    </div>
  );
};

export default BandList;
