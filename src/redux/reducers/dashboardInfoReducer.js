import {
  GET_TOTAL_REGISTER_USER_COUNT,
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
const initialState = {
  totalRegisterUser: 0,
  totalFreeUser: 0,
  totalPremiumUser: 0,
  totalBalance: {},
  weeklyRegister: [],
  totalMale: 0,
  totalFemale: 0,
  totalSingle: 0,
  totalDivorceCount: 10,
  totalSliverUser: 0,
  totalGoldUser: 0,
  country: [],
};
const DashboardInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_REGISTER_USER_COUNT:
      return {
        ...state,
        totalRegisterUser: action.payload.details,
      };
    case GET_TOTAL_FREE_USER_COUNT:
      return {
        ...state,
        totalFreeUser: action.payload.details,
      };
    case GET_TOTAL_PREMIUM_USER_COUNT:
      return {
        ...state,
        totalPremiumUser: action.payload.details,
      };

    case GET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: action.payload,
      };
    case GET_WEEKLY_REGISTER_USER_COUNT:
      return {
        ...state,
        weeklyRegister: action.payload,
      };

    case MALE_COUNT:
      return {
        ...state,
        totalMale: action.payload,
      };
    case FEMALE_COUNT:
      return {
        ...state,
        totalFemale: action.payload,
      };
    case SINGLE_COUNT:
      return {
        ...state,
        totalSingle: action.payload,
      };

    case DIVORCE_COUNT:
      return {
        ...state,
        totalDivorceCount: action.payload,
      };
    case COUNTRY_COUNT:
      return {
        ...state,
        country: action.payload,
      };

    case SLIVER_USER_COUNT:
      return {
        ...state,
        totalSliverUser: action.payload,
      };

    case GOLD_USER_COUNT:
      return {
        ...state,
        totalGoldUser: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardInfoReducer;
