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
  Slide
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";
import * as api from "../../../api/index";
import ViewDetails from "../../ViewUserDetails/UserDetails";

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

const DisApproveList = () => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [rejectedProfile, setRejectedProfile] = useState([])
  const [profileId, setProfileId] = useState('')

  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };
    // fetch 
    const fetch = async () => {
      const rejectedList = await api.disapproveListUrl();
      console.log(rejectedList)
      if (rejectedList.code === 200) {
        setRejectedProfile(rejectedList.details);
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
        title="Reject List"
        columns={[
          {
            title: "Date",
            editable: "false",
            field: "createdAt",
            render: (rowData) =>
              moment(rowData.created).format("D MM YYYY, h:mm a"),
          },
          { title: "Name", editable: "false", field: "firstName" },

          {
            title: "Country",
            field: "country",
          },
          {
            title: "Status",
            field: 'approval',

          },
          // {
          //   title: "Details",
          //   field: "id",
          //   render: (rowData) => (
          //     <Button
          //       size="small"
          //       variant="contained"
          //       color="primary"
          //       onClick={() => {
          //         setProfileId(rowData.id);
          //         handleClickOpenView();
          //       }}
          //     >
          //       View
          //     </Button>
          //   ),
          // },
   
          

        ]}
        data={rejectedProfile}
        actions={[
          (rowData) => ({
            icon: () => (
              <Button fullWidth={true} variant="contained" color="primary">
                <DescriptionIcon fontSize="small" color="white" />
              </Button>
            ),
            tooltip: "View Profile",
            onClick: (event, rowData) => {
              setProfileId(rowData.id);
              handleClickOpenView();
            },
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

export default DisApproveList;
