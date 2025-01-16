const BtnForm = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full bg-neutral-100 text-black font-medium py-3 px-4 rounded-3xl hover:bg-black border-2 hover:text-white focus:outline-none"
      >
        {title}
      </button>
    </div>
  );
};
export default BtnForm;
