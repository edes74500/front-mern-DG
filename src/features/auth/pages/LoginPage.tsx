import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../api/authApiSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const [rateLimitInfo, setRateLimitInfo] = useState({
    limit: undefined,
    remaining: undefined,
    reset: undefined,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login({ username: email, password }).unwrap();
      console.log("Login successful! Cookie should be set.");
    } catch (err: any) {
      const rateLimit = err.rateLimit;
      setRateLimitInfo(rateLimit);
    }
  };

  useEffect(() => {
    console.log(rateLimitInfo);
  }, [rateLimitInfo]);

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
              type="text"
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
        {rateLimitInfo.remaining === "0" && rateLimitInfo?.reset && (
          <div className="mt-4 text-center text-red-600">
            Vous avez atteint le nombre maximum de tentatives de connexion. Veuillez réessayer dans{" "}
            {rateLimitInfo.reset} secondes.
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
