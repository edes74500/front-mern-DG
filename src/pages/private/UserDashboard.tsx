import DashboardContent from "../../components/userDashboard/DashboardContent";
import DashboardMenu from "../../components/userDashboard/DashboardMenu";

const UserDashboard = () => {
  return (
    <div className="relative flex flex-col md:grid md:grid-cols-[auto_1fr] h-full">
      <DashboardMenu />
      <DashboardContent />
    </div>
  );
};

export default UserDashboard;
