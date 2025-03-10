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
    <div className="w-full  headerContent fixed">
      <div className=" h-[20px]  max-w-[800px] m-auto">
        <div className=" flex justify-between items-center ">
          <div className="w-[125px] h-[20px]">
            <img src="/logoimg.png" alt="" className="w-[200px] h-[50px]" />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
