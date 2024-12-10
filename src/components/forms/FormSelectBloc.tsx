import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface FormSelectBlocProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  triggerValidation?: string;
}

const FormSelectBloc: React.FC<FormSelectBlocProps> = ({ name, label, options, placeholder, triggerValidation }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref, ...field } }) => (
          <Select
            onValueChange={(newValue) => {
              onChange(newValue);
              trigger(name);
              if (triggerValidation) {
                trigger(triggerValidation);
              }
            }}
            value={value}
            {...field}
          >
            <SelectTrigger
              ref={ref}
              className={`w-full text-gray-800 bg-white hover:bg-white ${errors[name] ? "select-error" : ""}`}
            >
              <SelectValue placeholder={placeholder || "Sélectionnez"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage.toString()}</p>}
    </div>
  );
};

export default FormSelectBloc;
