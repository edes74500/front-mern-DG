import { IUpdateUserBodyRequest, IUserBaseResponse, updateUserRequestBodySchema } from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormActions from "./FormActions";
import RolesSelector from "./RolesSelector";
import UserDetailsForm from "./UserDetailsForm";

interface EditUserFormProps {
  user: IUserBaseResponse;
  onUpdateUser: (updatedUser: any) => void;
  onCancel: () => void;
  onOpenDeleteModal: () => void;
}

const EditUserForm = ({ user, onUpdateUser, onCancel, onOpenDeleteModal }: EditUserFormProps) => {
  const methods = useForm<IUpdateUserBodyRequest>({
    resolver: zodResolver(updateUserRequestBodySchema),
    defaultValues: {
      username: user.username,
      password: "",
      active: user.active,
      roles: user.roles,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: IUpdateUserBodyRequest) => {
    onUpdateUser({
      userId: user.id,
      ...data,
    });
  };

  // Mettre à jour les valeurs initiales si `user` change
  useEffect(() => {
    reset({
      username: user.username,
      password: "",
      active: user.active,
      roles: user.roles,
    });
  }, [user, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
        <UserDetailsForm />
        <RolesSelector />
        <FormActions onCancelClick={onCancel} onDeleteClick={onOpenDeleteModal} />
      </form>
    </FormProvider>
  );
};

// const [username, setUsername] = useState(user.username);
// const [roles, setRoles] = useState<IRoleEnum[]>(user.roles);
// const [active, setActive] = useState(user.active);
// const [password, setPassword] = useState("");

// useEffect(() => {
//   setUsername(user.username);
//   setRoles(user.roles);
//   setActive(user.active);
// }, [user]);

// const onSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!username.trim()) {
//     notify("Le nom d'utilisateur est requis.", "error");
//     return;
//   }

//   if (roles.length === 0) {
//     notify("Au moins un rôle est requis.", "error");
//     return;
//   }

//   const validatedRoles = roles as IRequiredRoleEnum;

//   onUpdateUser({
//     userId: user.id,
//     username,
//     roles: validatedRoles,
//     active,
//     ...(password && { password }),
//   });
// };

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
//       <div className="flex items-center gap-4 mb-4">
//         <div className="p-3 bg-blue-100 rounded-full">
//           <UserIcon className="w-8 h-8 text-blue-600" />
//         </div>
//         <h3 className="text-xl font-bold text-gray-800">{user.username}</h3>
//       </div>
//       <UserDetailsForm
//         username={username}
//         setUsername={setUsername}
//         active={active}
//         setActive={setActive}
//         password={password}
//         setPassword={setPassword}
//       />
//       <RolesSelector roles={roles} setRoles={setRoles} />
//       <FormActions onCancelClick={onCancel} onDeleteClick={onOpenDeleteModal} />
//     </form>
//   );
// };

export default EditUserForm;
