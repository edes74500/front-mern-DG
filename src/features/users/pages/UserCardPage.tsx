import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { useGetUserByIdQuery } from "../usersApiSlice";
import UserCard from "../components/UserCard/UserCard";

const UserCardPage = () => {
  const { userId } = useParams<{ userId: IUser["id"] }>(); // Typage des params
  const { data: user, isLoading, isError } = useGetUserByIdQuery({ userId: userId || "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Peut contenir d'autres effets spécifiques à la page
  }, []);

  if (isLoading) return <p>Loading user...</p>;
  if (isError || !userId) return <p>Error fetching user or invalid ID</p>;
  if (!user) return <p>User not found</p>;

  return (
    <UserCard
      user={user}
      onEdit={() => navigate(`/dashboard/user/edit/${userId}`)} // Gère la navigation
    />
  );
};

export default UserCardPage;
