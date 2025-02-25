// import logo from "@/assets/swap/rekt-logo-white-1536x643.png";
// import "./index.scss";
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
    <div className="w-full bg-[#000] headerContent">
      <div className="pcSty h-[83px]  max-w-[800px] m-auto">
        <div className=" flex justify-between items-center ">
          <div className="w-[125px] h-[52px]">
            <img src="/rekt-logo-white-1536x643.png" alt="" className="w-[125px] h-[52px]" />
          </div>
          <div>
            <a className="text-[#fff] font-bold p-[10px]" href="/">
              About
            </a>
            <a className="text-[#fff] font-bold p-[10px]" href="/">
              How to Buy
            </a>
            <a className="text-[#fff] font-bold p-[10px]" href="/">
              Buy With Card
            </a>
            <a className="text-[#fff] font-bold p-[10px]" href="/">
              Tokenomics
            </a>
          </div>
        </div>
      </div>
      <div className="mobsty h-[83px] w-full px-10">
        <div className="flex justify-between items-center relative">
        <div className="w-[125px] h-[52px]">
          <img src='/rekt-logo-white-1536x643.png' alt="" className="w-full h-full" />
        </div>
        <div
          onClick={() => {
            open ? onClose() : showDrawer();
          }}
        >
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1498"
            width="32"
            height="32"
          >
            <path
              d="M133.310936 296.552327l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949 0-19.781623-15.997312-35.950949-35.950949-35.950949L133.310936 224.650428c-19.781623 0-35.950949 16.169326-35.950949 35.950949C97.359987 280.383 113.529313 296.552327 133.310936 296.552327z"
              fill="#e3f50d"
              p-id="1499"
            ></path>
            <path
              d="M890.51705 476.135058 133.310936 476.135058c-19.781623 0-35.950949 16.169326-35.950949 35.950949 0 19.781623 16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949C926.467999 492.304384 910.298673 476.135058 890.51705 476.135058z"
              fill="#e3f50d"
              p-id="1500"
            ></path>
            <path
              d="M890.51705 727.447673 133.310936 727.447673c-19.781623 0-35.950949 15.997312-35.950949 35.950949s16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-15.997312 35.950949-35.950949S910.298673 727.447673 890.51705 727.447673z"
              fill="#e3f50d"
              p-id="1501"
            ></path>
          </svg>
        </div>
        <div
          className={`contlist bg-[#fff] h-[160px] w-full absolute top-[83px] left-0 flex flex-col transition-all duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <a className="text-[#000] p-[10px] border" href="/">
            About
          </a>
          <a className="text-[#000] p-[10px]" href="/">
            How to Buy
          </a>
          <a className="text-[#000] p-[10px]" href="/">
            Buy With Card
          </a>
          <a className="text-[#000] p-[10px]" href="/">
            Tokenomics
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
