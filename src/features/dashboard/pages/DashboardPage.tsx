import CreateUserForm from "../../users/components/CreateUserForm/CreateUserForm";
import UserListPage from "../../users/pages/UserListPage";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <UserListPage />
      <CreateUserForm />
    </div>
  );
};

export default DashboardPage;
