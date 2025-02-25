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
    <div className="h-[48px] bg-[#e73223] text-[#333] font-bold ">
      <div className="pcSty w-full h-full px-10">
        <div className=" w-full flex items-center h-full ">
          <img src="/osak-logo-border.svg" className="w-[35px] w-[35px] mr-[10px]" alt="" />
          <a
            className="px-[8px] text-[#000] font-bold hover:bg-[#000] hover:text-[#fff] h-full flex items-center"
            href="/"
          >
            ABOUT
          </a>
          <a
            className="px-[8px] text-[#000] font-bold hover:bg-[#000] hover:text-[#fff] h-full flex items-center"
            href="/swap"
          >
            BUY
          </a>
          <a
            className="px-[8px] text-[#000] font-bold hover:bg-[#000] hover:text-[#fff] h-full flex items-center"
            href="/"
          >
            COMMUNITY
          </a>
          <a
            className="px-[8px] text-[#000] font-bold hover:bg-[#000] hover:text-[#fff] h-full flex items-center"
            href="/"
          >
            TOKENOMICS
          </a>
        </div>
      </div>
      <div className="mobSty w-full h-full relative">
        <div className="w-full  justify-between flex items-center h-full">
          <img src="/osak-logo-border.svg" className="w-[35px] w-[35px] mr-[10px]" alt="" />
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
                d="M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z"
                p-id="1499"
                fill="#ffffff"
              ></path>
              <path
                d="M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z"
                p-id="1500"
                fill="#ffffff"
              ></path>
              <path
                d="M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z"
                p-id="1501"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div
              className={`contlist bg-[#fff] h-[150px] w-full absolute top-[48px] left-0 flex flex-col transition-all duration-300 ${
                open ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <a className="text-[#000] p-[10px] border" href="/">
                About
              </a>
              <a className="text-[#000] p-[10px]" href="/swap">
                BUY
              </a>
              <a className="text-[#000] p-[10px]" href="/">
                COMMUNITY
              </a>
              <a className="text-[#000] p-[10px]" href="/">
                TOKENOMICS
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
