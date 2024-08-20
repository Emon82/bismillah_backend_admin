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

const ApproveUserList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [profileId, setProfileId] = useState("");

  const [approvedProfile, setApprovedProfile] = useState([]);

  // fetch
  const fetch = async () => {
    const approved = await api.approvedListUrl();
    console.log(approved);
    if (approved.code === 200) {
      setApprovedProfile(approved.details);
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
        <ViewDetails profileId={profileId} />
      </Dialog>

      <MaterialTable
        title="Approved Profile List"
        columns={[
          {
            title: "Date",
            editable: "false",
            field: "createdAt",
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
            field: "approval",
          },
        ]} 
        data={approvedProfile}
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

export default ApproveUserList;
