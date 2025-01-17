import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const sizeImage = 40;

  return (
    <Link
      href={"/"}
      className="flex items-center gap-x-3 group transition-all duration-300 hover:scale-105"
    >
      <Image
        src="/favicon.svg"
        alt="Logo"
        width={sizeImage}
        height={sizeImage}
        className="bg-white rounded-2xl group-hover:rotate-12 transition-transform duration-300"
      />
      <h1 className="text-lg md:text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
        Next Social Network
      </h1>
    </Link>
  );
};
export default Logo;
