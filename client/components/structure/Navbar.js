import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-w-7xl p-4 sm:p-6 lg:p-8 fixed z-20">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex-shrink-0 hover:scale-105">
          <Image src="./logoLowRes.svg" width={150} height={50} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
