import React, { useState } from "react";

const Sidenav = () => {
  const [state, setState] = useState(0)
  const menu = [
    { title: "Woman's Fashion", link: "" },
    { title: "Men's Fashion", link: "" },
    { title: "Electronics", link: "" },
    { title: "Home & Lifestyle", link: "" },
    { title: "Medicine", link: "" },
    { title: "Sports & Outdoor", link: "" },
    { title: "Medicine", link: "" },
    { title: "Baby's & Toys", link: "" },
    { title: "Medicine", link: "" },
    { title: "Groceries & Pets", link: "" },
    { title: "Health & Beauty", link: "" },
  ];

  return (
    <div className="border-r pr-24 pt-5 w-[30%]">
      {menu.map((item, i) => {
        return <div className={`my-3 cursor-pointer ${state === i ? "text-[#DB4444]" : ""}`} onClick={() => setState(i)}>{item?.title}</div>;
      })}
    </div>
  );
};

export default Sidenav;