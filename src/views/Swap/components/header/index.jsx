import { useState } from "react";
const PageHeader = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-full h-[53px] bg-[#0052FE] relative">
      <div className="h-full w-full pcSty">
        <div className="  h-full w-full flex items-center justify-center">
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/"
          >
            Home
          </a>
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/"
          >
            About
          </a>
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/"
          >
            TOKENOMICS
          </a>
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/"
          >
            HOW TO BUY
          </a>
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/"
          >
            COMMUNITY
          </a>
          <a
            className="px-15 py-2 font-bold text-[#fff] hover:border-b-2 hover:border-white transition-all duration-200"
            href="/swap"
          >
            BUY $BONK
          </a>
        </div>
      </div>
      <div className="mobSty h-full w-full">
        <div
          className="w-full h-full flex justify-center items-center"
          onClick={() => {
            open ? onClose() : showDrawer();
          }}
        >
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4247"
            width="32"
            height="32"
          >
            <path
              d="M896 232.727273h-744.727273a34.909091 34.909091 0 0 1 0-69.818182h744.727273a34.909091 34.909091 0 0 1 0 69.818182zM896 884.363636h-744.727273a34.909091 34.909091 0 0 1 0-69.818181h744.727273a34.909091 34.909091 0 0 1 0 69.818181zM709.818182 558.545455h-558.545455a34.909091 34.909091 0 0 1 0-69.818182h558.545455a34.909091 34.909091 0 0 1 0 69.818182z"
              fill="#ffffff"
              p-id="4248"
            ></path>
          </svg>
        </div>
        <div
          className={`contlist bg-[#0052FE] text-center font-bold h-[230px] w-full absolute top-[53px] left-0 flex flex-col transition-all duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            Home
          </a>
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            About
          </a>
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            TOKENOMICS
          </a>
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            HOW TO BUY
          </a>
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            COMMUNITY
          </a>
          <a className="text-[#fff] p-[10px] font-bold" href="/">
            BUY $BONK
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
