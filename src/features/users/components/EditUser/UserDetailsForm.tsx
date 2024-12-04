import { IUpdateUserBodyRequest } from "@edes74500/fixrepairshared";
import { CheckCircle, XCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

// interface UserDetailsFormProps {
//   username: string;
//   setUsername: React.Dispatch<React.SetStateAction<string>>;
//   active: boolean;
//   setActive: React.Dispatch<React.SetStateAction<boolean>>;
//   password: string;
//   setPassword: React.Dispatch<React.SetStateAction<string>>;
// }

const UserDetailsForm = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext<IUpdateUserBodyRequest>();
  const active = watch("active");

  return (
    <>
      {/* Nom d'utilisateur */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          {...register("username", {
            onBlur: () => trigger("username"), // Valide à la perte de focus
            onChange: () => trigger("username"), // Valide à chaque changement
          })}
          className={`${errors?.username?.message && touchedFields.username ? "error" : "valid"}`}
        />
        {/* Affichage des erreurs uniquement si elles existent */}
        {touchedFields.username && errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      {/* Mot de passe */}
      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Nouveau mot de passe (laisser vide pour ne pas changer)
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            onBlur: () => trigger("password"), // Valide à la perte de focus
            onChange: () => trigger("password"), // Valide à chaque changement
          })}
          className={`w-full p-2 mt-1 border rounded-md focus:outline-none ${
            errors?.password?.message && touchedFields.password
              ? " ring-red-500 ring-2 focus:ring-red-500" // Bordure et bague rouges si erreur
              : "border-gray-300 focus:ring-2 focus:ring-blue-500" // Bordure et bague bleues si valide
          }`}
        />
        {/* Affichage des erreurs uniquement si elles existent */}
        {touchedFields.password && errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Actif */}
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setValue("active", !active)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
            active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {active ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Actif
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              Inactif
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default UserDetailsForm;
