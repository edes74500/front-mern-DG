import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Tentative de connexion avec:", email, password);
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full h-full bg-gray-100">
      {" "}
      {/* flex-grow prendra l'espace */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md ">
        <h2 className="mb-6 text-2xl font-bold text-center text-tech-blue">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champs de connexion */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tech-blue focus:border-tech-blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tech-blue focus:border-tech-blue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-tech-blue hover:bg-tech-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tech-blue"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
