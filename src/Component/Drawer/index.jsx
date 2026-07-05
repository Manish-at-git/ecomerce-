import React, { useState } from "react";
import Close from "../../assets/icons/FCSVG/CommonIcons";
import { Loader } from "../../assets/icons/FCSVG/CommonIcons";
import { MdClose } from "react-icons/md";

const ProductForm = ({ width, header, children, hideModal, isLoading }) => {
  const [open, setOpen] = useState(true);
  const handleModel = () => {
    setOpen(false);
    setTimeout(() => {
      hideModal();
    }, 300);
  };

  console.log("sdfsdfsfsfs");

  return (
    <>
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center overflow-hidden outline-none bg-black/60 focus:outline-none transition-opacity duration-700 ${
          open ? "fadeIn" : "fadeOut pointer-events-none"
        }`}
      ></div>
      {/* {isLoading && <Loader isLoading={isLoading} />} */}
      <div
        className={`fixed z-50 w-full lg:w-${width} top-0 h-full bg-white shadow-lg right-0 ${
          open ? "slideIn" : "slideOut"
        } ${isLoading ? "hidden" : "visible"} `}
      >
        <div className="flex items-center justify-between gap-4 py-4 md:py-5 px-5 md:pr-7 md:pl-9 bg-gray-o-100">
          <h3 className="font-medium text-black text-base md:text-lg">
            {header}
          </h3>
          <div className="cursor-pointer" onClick={handleModel}>
            {/* <Close className="text-black stroke-2" /> */}
            <MdClose />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden h-full">{children}</div>
      </div>
    </>
  );
};

export default ProductForm;
