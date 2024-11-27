import { CheckCircle, XCircle } from "lucide-react";

interface UserDetailsFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const UserDetailsForm = ({ username, setUsername, active, setActive, password, setPassword }: UserDetailsFormProps) => {
  return (
    <>
      {/* Nom d'utilisateur */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Mot de passe */}
      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Nouveau mot de passe (laisser vide pour ne pas changer)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actif */}
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setActive(!active)} // Toggle l'état actif/inactif
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
