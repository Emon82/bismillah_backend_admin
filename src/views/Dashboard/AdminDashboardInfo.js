import React, { useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useDispatch, useSelector } from "react-redux";
import CardBox from "../Item/CardBox";
import Chart from "../Item/Chart";
import FreeAndPremiumUserChart from "../Item/FreeAndPremiumUserChart.js";
// import TopCountryChart from '../Item/TopCountryChart'
import { GiArchiveRegister } from 'react-icons/gi';
import { FaCrown,FaFemale } from 'react-icons/fa';
import { BiMale } from 'react-icons/bi';




import Country from '../Item/Country';
import {
  getTotalRegisterUserCount,
  getTotalFreeUserUserCount,
  getTotalPremiumUserCount,
  getTotalBalanceCount,
  getWeeklyRegisterUser,
  getMaleCount,
  getFemaleCount,
  getSingleCount,
  divorceCount,
  countryCount,
  sliverUserCount,
  goldUserCount


} from "../../redux/actions/dashboardInfoAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardInfoState = useSelector((state) => state.dashboardInfoState);
  const fetch = () => {
    dispatch(getWeeklyRegisterUser());
    dispatch(getTotalRegisterUserCount());
    dispatch(getTotalFreeUserUserCount());
    dispatch(getTotalBalanceCount());
    dispatch(getTotalPremiumUserCount());
    dispatch(getMaleCount());
    dispatch(getFemaleCount());
    dispatch(getSingleCount());
    dispatch(divorceCount());
    dispatch(countryCount());
    dispatch(sliverUserCount());
    dispatch(goldUserCount());
  };
  useEffect(() => {
    fetch();
  }, []);

  console.log(dashboardInfoState.totalDivorceCount)
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Register User"
                count={dashboardInfoState?.totalRegisterUser}
                icon={<GiArchiveRegister />}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Free User"
                count={dashboardInfoState?.totalFreeUser}
                icon={<PeopleIcon />}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Premium User"
                count={dashboardInfoState?.totalPremiumUser}
                icon={<FaCrown />}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Total Balance"
                count={
                  dashboardInfoState?.totalBalance[0]
                    ? dashboardInfoState?.totalBalance[0]?.amount
                    : 0
                }
                icon={<AttachMoneyIcon />}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Male"
                count={dashboardInfoState?.totalMale}
                icon={<BiMale />}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Female"
                count={dashboardInfoState?.totalFemale}
                icon={<FaFemale />}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Unmarried"
                count={dashboardInfoState?.totalSingle}
                icon={<BiMale />}
              />
            </Grid>
         
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Divorce"
                count={
                  dashboardInfoState?.totalDivorceCount
                    ? dashboardInfoState?.totalDivorceCount
                    : 0
                }
                icon={<BiMale />}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Sliver User"
                count={
                  dashboardInfoState?.totalSliverUser
                    ? dashboardInfoState?.totalSliverUser
                    : 0
                }
                icon={<FaCrown />}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CardBox
                title="Gold User"
                count={
                  dashboardInfoState?.totalGoldUser
                    ? dashboardInfoState?.totalGoldUser
                    : 0
                }
                icon={<FaCrown />}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              </Grid>

              <Grid item lg={3} sm={6} xl={3} xs={12}>
              </Grid>



            <Grid item lg={6} md={12} xl={9} xs={12}>
              <Chart weeklyRegister={dashboardInfoState?.weeklyRegister} />
            </Grid>
            <Grid item lg={6} md={12} xl={9} xs={12}>
              <FreeAndPremiumUserChart
                weeklyRegister={dashboardInfoState?.weeklyRegister}
              />
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}></Grid>

            <Grid item lg={12} md={12} xl={12} xs={12}>
                    <Country count={dashboardInfoState.country}/>
            </Grid>
          
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
