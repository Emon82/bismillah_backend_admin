import { GET_TOTAL_REGISTER_USER_COUNT,
  GET_TOTAL_FREE_USER_COUNT,
  GET_TOTAL_PREMIUM_USER_COUNT,
  GET_TOTAL_BALANCE,
  GET_WEEKLY_REGISTER_USER_COUNT,
  MALE_COUNT,
  FEMALE_COUNT,
  SINGLE_COUNT,
  COUNTRY_COUNT,
  DIVORCE_COUNT,
  SLIVER_USER_COUNT,
  GOLD_USER_COUNT,
} from "../type";
import * as api from "../../api";


export const getTotalRegisterUserCount = () => async (dispatch) => {
  try {
    const res = await api.totalRegisterUserUrl();
    dispatch({ type: GET_TOTAL_REGISTER_USER_COUNT, payload: res });
  } catch (error) {
    console.log(error)
  }
};

export const getTotalFreeUserUserCount = () => async (dispatch) => {
  try {
    const res = await api.totalFreeUserUrl();
    dispatch({ type: GET_TOTAL_FREE_USER_COUNT, payload: res });
  } catch (error) {
    console.log(error)
  }
};

export const getTotalPremiumUserCount = () => async (dispatch) => {
  try {
    const res = await api.totalPremiumUserUrl();
    dispatch({ type: GET_TOTAL_PREMIUM_USER_COUNT, payload: res });
  } catch (error) {
    console.log(error)
  }
};

export const getTotalBalanceCount = () => async (dispatch) => {
  console.log('hhh')
  try {
    const res = await api.totalBalanceUrl();
    const amount = res.details.available[0]

    dispatch({ type: GET_TOTAL_BALANCE, payload: amount });
  } catch (error) {
    console.log(error)
  }
};

export const getWeeklyRegisterUser = () => async (dispatch) => {
  try {
    const res = await api.weeklyReportUrl();
    dispatch({ type: GET_WEEKLY_REGISTER_USER_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};



export const getMaleCount = () => async (dispatch) => {
  try {
    const res = await api.maleCountUrl();

    dispatch({ type: MALE_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};

export const getFemaleCount = () => async (dispatch) => {
  try {
    const res = await api.femaleCountUrl();
    dispatch({ type: FEMALE_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};


export const getSingleCount = () => async (dispatch) => {
  try {
    const res = await api.singleCountUrl();
    dispatch({ type: SINGLE_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};

export const divorceCount = () => async (dispatch) => {
  try {
    const res = await api.divorceCountUrl();
    dispatch({ type: DIVORCE_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};


export const countryCount = () => async (dispatch) => {
  try {
    const res = await api.countryCountUrl();
    dispatch({ type: COUNTRY_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};


export const sliverUserCount = () => async (dispatch) => {
  try {
    const res = await api.sliverUserCountUrl();
    dispatch({ type: SLIVER_USER_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};


export const goldUserCount = () => async (dispatch) => {
  try {
    const res = await api.goldUserCountUrl();
    dispatch({ type: GOLD_USER_COUNT, payload: res.details });
  } catch (error) {
    console.log(error)
  }
};

