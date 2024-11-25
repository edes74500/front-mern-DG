import CreateUserForm from "../../components/userDashboard/userForm/CreateUserForm";
import UserList from "../../components/userDashboard/userList/UserList";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <UserList />
      <CreateUserForm />
    </div>
  );
};

export default DashboardContent;
