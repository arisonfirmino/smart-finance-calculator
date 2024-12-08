import Image from "next/image";

const Header = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <div className="flex items-center gap-2.5">
        <Image
          src="/SFC logo.png"
          alt="FSC: Smart Finance Calculator logo"
          height={328}
          width={328}
          className="h-10 w-10"
        />
        <h1 className="hidden text-xl font-bold md:block">
          Smart Finance Calculator
        </h1>
      </div>
    </header>
  );
};

export default Header;
