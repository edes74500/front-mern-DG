import { useState } from "react";
import FormInput from "./FormInput";
import RoleCheckboxGroup from "./RoleCheckboxGroup";
import SubmitButton from "./SubmitButton";
import { useCreateUserMutation } from "../../usersApiSlice";

function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createUser({ username, password, roles }).unwrap();
      setMessage(`User created successfully: ${response.username}`);
      console.log("User created successfully:", response);
    } catch (err: any) {
      setMessage(err?.data?.message || "Error creating user. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Create User</h2>
      {message && <div className="mb-4 text-lg">{message}</div>}

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        />
        <FormInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <RoleCheckboxGroup roles={roles} setRoles={setRoles} />
        <SubmitButton isLoading={isLoading} isError={isError} error={error} />
      </form>
    </div>
  );
}

export default CreateUserForm;
