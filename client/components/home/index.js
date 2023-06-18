import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="mx-5 pb-[12vh] flex items-end h-screen overflow-hidden">
      <div className="flex flex-col gap-16 max-md:gap-14 m-10 z-10 relative">
        <div className="flex">
          <Image
            src="/heroBadge1.jpg"
            width={150}
            height={50}
            className="w-36 h-36 object-cover object-top rounded-full z-10"
          />
          <Image
            src="/heroBadge2.jpg"
            width={150}
            height={50}
            className="w-36 h-36 object-cover rounded-full -ml-14 z-0"
          />
        </div>
        <h1 className="text-orange font-normal font-['Gloock'] text-7xl w-3/5 max-md:text-6xl max-lg:w-full">
          Jam with Musicians Worldwide on Jamzy!
        </h1>
        <Link
          href="/jam"
          className="w-fit p-4 text-md rounded-lg bg-red hover:scale-[1.02]"
        >
          Start Jamming Now
        </Link>
      </div>
      <div className="absolute z-0 right-0 top-0 max-sm:left-0">
        <Image
          src="/HeroBg.jpg"
          width={1050}
          height={750}
          className="h-screen object-cover opacity-60 max-sm:object-left-bottom "
        />
      </div>
    </div>
  );
};

export default HomePage;
