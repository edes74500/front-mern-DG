CREER UNE ROUTE UNIQUE

import React, { useState } from "react"; import { zodResolver } from "@hookform/resolvers/zod"; import { useForm } from
"react-hook-form"; import axios from "axios"; import { userValidationSchema } from "./userValidationSchema";

export const RegisterForm = () => { const [isChecking, setIsChecking] = useState(false);

const { register, handleSubmit, setError, formState: { errors }, } = useForm({ resolver:
zodResolver(userValidationSchema), });

const onSubmit = async (data: any) => { setIsChecking(true);

    try {
      // Appel à l'API pour vérifier l'unicité du username et de l'email
      const response = await axios.post("/api/users/unique", {
        username: data.username,
        email: data.email,
      });

      if (!response.data.isUnique) {
        if (response.data.usernameExists) {
          setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
        }
        if (response.data.emailExists) {
          setError("email", {
            type: "manual",
            message: "Email is already in use",
          });
        }
        return;
      }

      // Si tout est bon, envoyer les données au serveur
      console.log("Form submitted successfully:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChecking(false);
    }

};

return ( <form onSubmit={handleSubmit(onSubmit)}> <div> <label>Username</label> <input {...register("username")} />
{errors.username && <p>{errors.username.message}</p>} </div>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isChecking}>
        {isChecking ? "Checking..." : "Register"}
      </button>
    </form>

); };
