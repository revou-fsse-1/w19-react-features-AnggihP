// type FooterProps = {
//     setRegisterPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   };
  
  export const Footer = (
    // { setRegisterPageOpen }: FooterProps
    ) => {
    return (
      <footer className="px-5 pt-6 flex flex-col justify-center items-center gap-6 text-center bg-emerald-600 bg-[url('')] bg-no-repeat bg-right bg-cover">
        <h2 className="text-2xl">Please, register below if you're an EPL Team Fan !!</h2>
        {/* <button
        //   onClick={() => setRegisterPageOpen((prev) => !prev)}
          className="px-20 py-3 text-xl rounded-lg text-fuchsia-300 bg-black transition-all duration-500 hover:scale-110 hover:bg-gray-900"
        >
          Register
        </button> */}
        <span className="mt-5 text-white text-medium">Please visit official site : www.premierleague.com</span>
      </footer>
    );
  };