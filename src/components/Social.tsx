import Link from "next/link";

export default function Social() {
  return (
    <Link
      href="https://www.instagram.com/manuscritgraphisme/"
      target="_blank"
      className="group relative lg:h-96 h-42 flex justify-center items-center text-center text-white bg-cover bg-center bg-no-repeat cursor-pointer"
      style={{
        backgroundImage: "url('/images/background-contact.png')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/60 transition-all duration-500 ease-in-out group-hover:bg-black/70"></div>

       
      <div className="relative z-10">
        <p className="lg:text-4xl  md:text-5xl font-bold  leading-snug">
          Suivez-moi sur <br />
          <span className=" ">@ManuscritGraphisme</span>
        </p>
      </div>
    </Link>
  );
}
