import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";

const SidenavAdmin = () => {
  const router = useRouter()
  const [state, setState] = useState(0);
  const menu = [
    { title: "Products", link: "/admin/product" },
    { title: "Category", link: "/admin/category" },
    { title: "Lists", link: "/admin/list" },
  ];

  return (
    <div className="border-r p-3">
      {menu.map((item, i) => {
        return (
          <div
            className={`w-full px-14 py-2 my-3 cursor-pointer rounded p-3 ${
              state === i ? "bg-[#DB4444] text-white" : ""
            }`}
            onClick={() => {
              setState(i);
              router.push(item.link)
            }}
          >
            {item?.title}
          </div>
        );
      })}
    </div>
  );
};

export default SidenavAdmin;
