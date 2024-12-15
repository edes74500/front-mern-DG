import FormInputBloc from "@/components/forms/FormInputBloc";
import FormInputCheckbox from "@/components/forms/FormInputCheckbox";
import FormInputPassword from "@/components/forms/FormInputPassword";
import ModalSpinner from "@/components/modalSpinner";
import { AuthLoginReqBodyDTO, authLoginReqBodyDTO } from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../state/authApiSlice";

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [currentError, setCurrentError] = useState<String>();
  const [rateLimitInfo, setRateLimitInfo] = useState({
    limit: undefined,
    remaining: undefined,
    reset: undefined,
  });
  // const [currentError, setCurrentError] = useState(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const methods = useForm({
    resolver: zodResolver(authLoginReqBodyDTO),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: AuthLoginReqBodyDTO) => {
    try {
      const validData = authLoginReqBodyDTO.parse(data);
      console.log("Validation réussie :", validData);
    } catch (err) {
      console.error("Erreur de validation :", err);
    }
    try {
      console.log(data);
      console.log(errors);
      console.log(getValues());
      await login(data).unwrap();
      console.log("Login successful! Cookie should be set.");
      navigate("/dashboard");
    } catch (err: any) {
      setCurrentError("Erreur server, veuillez réessayer plus tard.");
      console.log("error", err);
      const rateLimit = err.rateLimit;
      setRateLimitInfo(rateLimit);
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full h-full bg-gray-100">
      <ModalSpinner isVisible={isLoading} /> {/* flex-grow prendra l'espace */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md ">
        <h2 className="mb-6 text-2xl font-bold text-center text-tech-blue">Connexion</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              // Gestion des erreurs et focus sur le premier champ avec une erreur
              console.log("Erreurs détectées :", errors);
              const firstError = Object.keys(errors)[0]; // Trouve le premier champ avec une erreur
              if (firstError) setFocus(firstError as keyof AuthLoginReqBodyDTO);
            })}
            className="space-y-5"
          >
            <FormInputBloc name="username" label="Username" />
            <FormInputPassword name="password" label="Password" />
            <FormInputCheckbox name="rememberMe" label="Se souvenir de moi" />
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-tech-blue hover:bg-tech-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tech-blue"
              >
                Se connecter
              </button>
            </div>
          </form>
        </FormProvider>
        {currentError && !isLoading && <div className="mt-4 text-center text-red-600">{currentError}</div>}
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

// const handleSubmit = async (e: any) => {
//   e.preventDefault();
//   setCurrentError(null);
//   try {
//     await login({ username: email, password }).unwrap();
//     console.log("Login successful! Cookie should be set.");
//     navigate("/dashboard");
//   } catch (err: any) {
//     console.log("error", err);
//     setCurrentError(err?.error?.data?.message);
//     const rateLimit = err.rateLimit;
//     setRateLimitInfo(rateLimit);
//   }
// };

// return (
//   <div className="flex items-center justify-center flex-grow w-full h-full bg-gray-100">
//     {" "}
//     {/* flex-grow prendra l'espace */}
//     <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md ">
//       <h2 className="mb-6 text-2xl font-bold text-center text-tech-blue">Connexion</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Champs de connexion */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Adresse e-mail
//           </label>
//           <input
//             ref={usernameRef}
//             type="text"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tech-blue focus:border-tech-blue"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Mot de passe
//           </label>
//           <div className="relative mt-1">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tech-blue focus:border-tech-blue"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <Eye className="w-5 h-5 text-gray-500" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-tech-blue hover:bg-tech-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tech-blue"
//           >
//             Se connecter
//           </button>
//         </div>
//       </form>
