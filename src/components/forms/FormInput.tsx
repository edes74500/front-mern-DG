interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "password" | "email" | "number"; // Types d'input supportés
  required?: boolean;
  isTextarea?: boolean; // Défini si c'est un textarea
}

function FormInput(props: FormInputProps) {
  const { label, value, onChange, required } = props;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      {props.isTextarea ? (
        <textarea
          value={value}
          onChange={onChange} // Type sécurisé pour un textarea
          required={required}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      ) : (
        <input
          type={props.type} // Type requis pour un input
          value={value}
          onChange={onChange} // Type sécurisé pour un input
          required={required}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      )}
    </div>
  );
}

export default FormInput;
