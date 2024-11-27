interface SubmitButtonProps {
  isLoading: boolean;
  isError: boolean;
  error?: any;
}

function SubmitButton({ isLoading, isError, error }: SubmitButtonProps) {
  return (
    <>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create User"}
      </button>
      {isError && (
        <p className="mt-2 text-red-500">{error?.data?.message || "Error creating user. Please try again."}</p>
      )}
    </>
  );
}

export default SubmitButton;
