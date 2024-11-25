import { Outlet } from "react-router-dom";
import DashboardMenu from "../components/userDashboard/layout/DashboardMenu";

const UserDashboardLayout = () => {
  return (
    <div className="relative flex flex-col md:grid md:grid-cols-[auto_1fr] flex-grow">
      <DashboardMenu />
      <div className={`flex-grow bg-gray-100 p-5 transition `}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
