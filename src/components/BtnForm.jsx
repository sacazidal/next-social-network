const BtnForm = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full text-sm md:text-base bg-neutral-100 text-black font-medium py-2 px-3 md:py-3 md:px-4 rounded-3xl hover:bg-black border-2 hover:text-white focus:outline-none"
      >
        {title}
      </button>
    </div>
  );
};
export default BtnForm;
