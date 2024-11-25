import CreateUserForm from "../../components/userDashboard/userForm/CreateUserForm";
import UserList from "../../components/userDashboard/userList/UserList";

const DashboardContent = () => {
  return (
    <div>
      <UserList />
      <CreateUserForm />
    </div>
  );
};

export default DashboardContent;
