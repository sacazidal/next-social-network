import Link from "next/link";

const ActionHeaderBtn = ({
  title,
  href,
  classname,
  onClick,
}) => {
  if (href) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center py-2 px-4 rounded-xl border-2 border-white font-medium text-base transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg ${classname}`}
      >
        <Link href={href}>{title}</Link>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center py-2 px-4 rounded-xl border-2 border-white font-medium text-base transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg ${classname}`}
    >
      <Link href={href}>{title}</Link>
    </button>
  );
};
export default ActionHeaderBtn;
