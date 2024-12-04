interface RoleCheckboxGroupProps {
  roles: string[];
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

function RoleCheckboxGroup({ roles, setRoles }: RoleCheckboxGroupProps) {
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setRoles((prevRoles) => (checked ? [...prevRoles, value] : prevRoles.filter((role) => role !== value)));
  };

  const availableRoles = ["admin", "manager", "employee"];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">Roles</label>
      <div className="flex flex-col">
        {availableRoles.map((role) => (
          <label key={role}>
            <input
              type="checkbox"
              value={role}
              onChange={handleRoleChange}
              checked={roles.includes(role)}
              className="mr-2"
            />
            {role}w
          </label>
        ))}
      </div>
    </div>
  );
}

export default RoleCheckboxGroup;
