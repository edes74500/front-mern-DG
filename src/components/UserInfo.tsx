interface UserInfoProps {
  label: string;
  icon: React.ReactNode;
  username: string | null | undefined;
  isDeleted?: boolean;
}

const UserInfo = ({ label, icon, username, isDeleted = false }: UserInfoProps) => (
  <p className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{label} :</span>{" "}
    {username ? (
      username
    ) : (
      <span className="italic text-gray-400">{isDeleted ? "Utilisateur supprimé" : "Non assignée"}</span>
    )}
  </p>
);

export default UserInfo;
