import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
import DescriptionIcon from '@material-ui/icons/Description';
// import AssessmentIcon from '@material-ui/icons/Assessment';
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
import UserList from "views/Userslist/UserList.js";
// import PendingBills from "views/Bills/PendingBills.js";
// import CompletedBills from "views/Bills/CompletedBills";
// import DeletedBills from "views/Bills/DeletedBills";
// import BillReports from "views/Reports/BillReports.js";
// import LadgerReport from "views/Reports/LadgerReport.js";
import Item from "views/Item/AddItem.js";
// import Login from 'views/Login/Login.js';
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// // core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/",
  //   name: "Login",
  //   // icon: Person,
  //   component: Login,
  //   layout: "/",
  // },
  // {
  //   path: "/user",
  //   name: "User List",
  //   icon: Person,
  //   component: TableList,
  //   layout: "/admin",
  // },
  {
    path: "/addItem",
    name: "Add Item",
    icon: BubbleChart,
    component: Item,
    layout: "/admin",
  },
  {
    path: "/bills",
    name: "All Bills",
    icon: DescriptionIcon,
    component: UserList,
    layout: "/admin",
  },
  // {
  //   path: "/pending",
  //   name: "Pending Bills",
  //   icon: DescriptionIcon,
  //   component: PendingBills,
  //   layout: "/admin",
  // },
  // {
  //   path: "/completed",
  //   name: "Completed Bills",
  //   icon: DescriptionIcon,
  //   component: CompletedBills,
  //   layout: "/admin",
  // },
  // {
  //   path: "/deleted",
  //   name: "Deleted Bills",
  //   icon: DescriptionIcon,
  //   component: DeletedBills,
  //   layout: "/admin",
  // },
  // {
  //   path: "/reports",
  //   name: "Reports",
  //   icon: AssessmentIcon,
  //   component: BillReports,
  //   layout: "/admin",
  // },
  // {
  //   path: "/ladger",
  //   name: "Ladger Report",
  //   icon: AssessmentIcon,
  //   component: LadgerReport,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
