
import Dashboard from "@material-ui/icons/Dashboard";
import PersonIcon from '@material-ui/icons/Person';
import ReportIcon from '@material-ui/icons/Report';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCrown,FaFemale } from 'react-icons/fa';
import AdminDashboardInfo from "views/Dashboard/AdminDashboardInfo";
import SuperAdminDashboardInfo from "views/Dashboard/SuperAdminDashboardInfo";
import PromotionManagment from './components/PromotionManagment/promotionManagment';
import ProfileManagement from './components/UserManagment/index';
import ReportManagement from './components/ReportManagment/index';
import planList from './components/PlanManagemt/PlanList';
import VendorManagement from './components/VendorManagement/VendorList';
import Profile from './components/Profile'
import GoldUserList from './components/PremiumUserList/GoldUserList';
import SliverUserList from './components/PremiumUserList/SliverUserList';


const superAdminRouting = [
  {
    path: "/dashboard",
    name: "Super Admin Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: SuperAdminDashboardInfo,
    layout: "/admin"
  },
 
];

const adminRouting = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AdminDashboardInfo,
    layout: "/admin"
  },
  {
    path: "/user-list",
    name: "User Management",
    rtlName: "لوحة القيادة",
    icon: AiOutlineUsergroupAdd,
    component: PromotionManagment,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Profile Management",
    rtlName: "لوحة القيادة",
    icon: PersonIcon,
    component: ProfileManagement,
    layout: "/admin"
  },

  {
    path: "/sliver-user",
    name: "Sliver User",
    rtlName: "لوحة القيادة",
    icon: FaCrown,
    component: SliverUserList,
    layout: "/admin"
  },
  {
    path: "/gold-user",
    name: "Gold User",
    rtlName: "لوحة القيادة",
    icon: FaCrown,
    component: GoldUserList,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Report Management",
    rtlName: "لوحة القيادة",
    icon: ReportIcon,
    component: ReportManagement,
    layout: "/admin"
  },
  {
    path: "/plan",
    name: "Plan Management",
    rtlName: "لوحة القيادة",
    icon: AccountBoxIcon,
    component: planList,
    layout: "/admin"
  },
  {
    path: "/vendor",
    name: "Vendor Management",
    rtlName: "لوحة القيادة",
    icon: StoreIcon,
    component: VendorManagement,
    layout: "/admin"
  },
  
  {
    path: "/profile",
    name: "Admin Profile",
    rtlName: "لوحة القيادة",
    icon: AccountCircleIcon,
    component: Profile,
    layout: "/admin"
  },

 
];


export  {adminRouting,superAdminRouting};
