import { CheckCircle, XCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

const FormUserSetActif = () => {
  const { watch, setValue } = useFormContext();
  const active = watch("active");

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        type="button"
        onClick={() => setValue("active", !active)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
          active ? "bg-green-100 hover:bg-green-200 text-green-700" : "bg-red-100 hover:bg-red-200 text-red-700"
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
  );
};
export default FormUserSetActif;
