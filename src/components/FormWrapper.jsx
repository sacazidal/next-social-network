const FormWrapper = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-172px)] md:min-h-[calc(100vh-120px)]">
      <div className="flex flex-col items-center rounded-3xl border-2 border-neutral-600 p-6 md:p-12 w-full max-w-xl">
        {children}
      </div>
    </div>
  );
};
export default FormWrapper;
