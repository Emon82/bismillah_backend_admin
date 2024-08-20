import axios from "axios";
const baseUrl = 'http://103.191.241.19:3100/api'

const config = { header: { "Content-Type": "application/json" } };

export const logIn = async (data) => {
  const response = await axios.post(`${baseUrl}/auth/login`, data, config);
  return response.data;
};
export const loadAdmin = async () => {
    const response = await axios.get(`${baseUrl}/admin/dashboard/myinfo`);
    return response.data;
};  
export const changePassword = async (data) => {
  const response = await axios.post(`${baseUrl}/user/account/change-password`, data, config);
  return response.data;
};
export const updateAccount = async (data) => {
  const response = await axios.post(`${baseUrl}/user/account/edit`, data, config);
  return response.data;
};

export const reportList = async () => {
  const response = await axios.post(`${baseUrl}/admin/users/reportlist`, config);
  return response.data;
};

export const banListUrl = async () => {

  const response = await axios.post(`${baseUrl}/admin/users/banlist`, config);
  return response.data;
};

export const userBanReqUrl = async (userId, reportedUserId) => {
  const response = await axios.post(`${baseUrl}/admin/users/ban`,{userId, reportedUserId}, config);
  return response.data;
};

export const userUnBanReqUrl = async (reportedUserId) => {
  const response = await axios.post(`${baseUrl}/admin/users/unban`,{reportedUserId}, config);
  return response.data;
};

export const profileDetailsUrl = async (id) => {
  const response = await axios.get(`${baseUrl}/profile/${id}`, config);
  return response.data;
};


// dashboard management 
export const totalRegisterUserUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/usercount`, config);
  return response.data;
};
export const totalFreeUserUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/normal-user`, config);
  return response.data;
};
export const totalPremiumUserUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/premium-user`, config);
  return response.data;
};
export const totalBalanceUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/payment/balance`, config);
  console.log(response.data)
  return response.data;
};
export const weeklyReportUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/recent-registered`, config);
  return response.data;
};

export const maleCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/malecount`, config);
  return response.data;
};

export const femaleCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/femalecount`, config);
  return response.data;
};
export const singleCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/singlecount`, config);
  return response.data;
}; 

export const divorceCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/divorce-count`, config);
  return response.data;
};


export const countryCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/countrycount`, config);
  return response.data;
};



export const goldUserCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/gold-user`, config);
  return response.data;
};

 
export const sliverUserCountUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/silver-user`, config);
  return response.data;
};

// premium user

export const goldUserListUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/gold-user-list`, config);
  return response.data;
};

 
export const sliverUserListUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/silver-user-list`, config);
  return response.data;
};


// user list and promition

export const allUserListUrl = async () => {
  const response = await axios.get(`${baseUrl}/admin/users?page=1&take=1000`, config);
  return response.data;
};


export const promotionUrl = async (id) => {
  const response = await axios.post(`${baseUrl}/admin/users/promote`,{id},config);
  return response.data;
};

export const demoteUrl = async (id) => {
  const response = await axios.post(`${baseUrl}/admin/users/deomote`,{id}, config);
  return response.data;
};



//  profile management
export const approvalListUrl = async () => {
  const response = await axios.post(`${baseUrl}/admin/users/approval-list`, config);
  return response.data;
};
export const approveUrl = async (profileId) => {
  const response = await axios.post(`${baseUrl}/admin/users/approve`,{profileId}, config);
  return response.data;
};
export const disapproveUrl = async (profileId,profileStatus) => {
  const response = await axios.post(`${baseUrl}/admin/users/disapprove`,{profileId,profileStatus}, config);
  return response.data;
};
export const disapproveListUrl = async () => {
  const response = await axios.post(`${baseUrl}/admin/users/disapproval-list`, config);
  return response.data;
};

export const approvedListUrl = async () => {
  const response = await axios.post(`${baseUrl}/admin/users/approved-list?page=1&take=1000`, config);
  return response.data;
};


export const awaitingProfileCount = async () => {
  const response = await axios.post(`${baseUrl}/admin/dashboard/awaiting-profile`, config);
  return response.data;
};


export const editProfileUrl = async (data) => {
  console.log(data)
  const response = await axios.post(`${baseUrl}/admin/users/edit-profile`,data, config);
  return response.data;
};

export const correctionReqUrl = async (profileId, correctionList) => {
  console.log(profileId, correctionList)
  const response = await axios.post(`${baseUrl}/admin/users/correction`,{profileId,correctionList}, config);
  return response.data;
};

export const correctionList = async () => {
  const response = await axios.post(`${baseUrl}/admin/users/correction-list`, config);
  return response.data;
};

// plan 
export const planList = async (data) => {
  const response = await axios.get(`${baseUrl}/admin/payment/planlist`, config);
  console.log(response.data)
  return response.data;
};

export const createPlan = async (data) => {
  // const data = d;
  // Object.keys(data).forEach((key) => {
  //   if (data[key] === '') {
  //     delete data[key];
  //   }
  // });
 
  // console.log(JSON.stringify(data),)
  const response = await axios.post('https://www.bismillahmarriage.com/api/admin/payment/plan',data,config);
  console.log(response)
  return response.data;
};

export const editPlan = async (data) => {
  console.log(data)
  const response = await axios.get(`${baseUrl}/admin/payment/edit-product`,data, config);
  return response.data;
};

export const activatePlan = async (data) => {
  console.log(data)
  const response = await axios.post(`${baseUrl}/admin/payment/activate`,data, config);
  return response.data;
};

export const deActivePlan = async (data) => {
  console.log(data)
  const response = await axios.post(`${baseUrl}/admin/payment/deactivate`,data, config);
  return response.data;
};


//vendor

export const vendorList = async (data) => {
  const response = await axios.get(`${baseUrl}/admin/dashboard/vendor/list`, config);
  console.log(response.data)
  return response.data;
};



export const activateVendor = async (data) => {
  console.log(data)
  const response = await axios.post(`${baseUrl}/admin/dashboard/vendor/activate`,data, config);
  return response.data;
};

export const deActiveVendor = async (data) => {
  console.log(data)
  const response = await axios.post(`${baseUrl}/admin/dashboard/vendor/deactivate`,data, config);
  return response.data;
};
