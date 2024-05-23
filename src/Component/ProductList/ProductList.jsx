import React, { useState } from "react";
import ComputerImg from "../../assets/images/ComputerImg.png";
import Game from "../../assets/images/GameImg.png";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import CrossSvg from "@/assets/icons/FCSVG/CrossSvg";

const ProductList = () => {
  const products = [
    {
      id: 1,
      productImg: ComputerImg,
      name: "LCD Monitor",
      price: 650,
      quantity: 0,
      subtotal: 0,
    },
    {
      id: 2,
      productImg: Game,
      name: "H1 Gamepad",
      price: 550,
      quantity: 0,
      subtotal: 0,
    },
    {
      id: 3,
      productImg: ComputerImg,
      name: "LCD Monitor",
      price: 650,
      quantity: 0,
      subtotal: 0,
    }
  ];

  const [productList, setProductList] = useState(products);

  const updateProduct = (id, quantity) => {
    setProductList((prevProducts) => {
      return prevProducts.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: quantity,
            subtotal: quantity * item.price,
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="w-9/12 mt-10 mx-auto flex flex-col ">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="w-full shadow-custom">
            <tr>
              <th className="px-5 py-5 text-start">Name</th>
              <th className="px-5 py-5 text-start">Price</th>
              <th className="px-5 py-5 text-start">Quantity</th>
              <th className="px-5 py-5 text-start">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                updateProduct={updateProduct}
                setProductList={setProductList}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:flex flex-wrap justify-between  mt-20">
        <CouponCode />
        <CartTotal products={productList} />
        <span></span>
      </div>
    </div>
  );
};

export default ProductList;

const CouponCode = () => {
  return (
    <div className="mb-2 md:mb-0 flex">
      <input
        className="h-10 px-4 border rounded-md border-black focus:border-black focus-visible:outline-black"
        type="text"
        placeholder="Coupon Code"
      />
      <Button className="px-12 py-4 ml-3 bg-[#DB4444] rounded-none text-white">
        Apply Coupon
      </Button>
    </div>
  );
};

const ProductRow = ({ product, updateProduct ,setProductList}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <tr
      className="px-2 py-4 shadow-custom mt-10 mb-4"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <td className="py-8 px-5">
        <div className="flex items-center relative">
          {isHovered && (
            <span
              className="bg-red-500 absolute -left-2 top-0 p-1 rounded-full cursor-pointer"
              style={{ top: "-5px", left: "-5px" }}
              onClick={() => {
                setProductList((prevProducts) =>
                  prevProducts.filter((item) => item.id !== product.id)
                );
              }}
            >
              <CrossSvg />
            </span>
          )}
          <Image
            src={product?.productImg}
            alt="product"
            width={40}
            height={40}
          />
          <span className="ml-3">{product.name}</span>
        </div>
      </td>
      <td className="py-8 px-5">${product.price}</td>
      <td className="py-8 px-5 w-1/4">
        <div className="">
          <input
            className="h-10 px-4 border rounded-md border-black focus:border-black focus-visible:outline-black"
            type="number"
            onChange={(e) =>
              updateProduct(product.id, parseInt(e.target.value))
            }
          />
        </div>
      </td>
      <td className="py-8 px-5">${product.subtotal}</td>
    </tr>
  );
};

const CartTotal = ({ products }) => {
  const total = products.reduce(
    (acc, item) => acc + (isNaN(item.subtotal) ? 0 : item.subtotal),
    0
  );
  return (
    <div className="border-2 rounded-sm border-[#000000]  p-8  md:w-1/3">
      <span className=" text-xl font-medium ">Cart Total</span>
      <span className=" border-b-2 mt-6 flex justify-between">
        <p className="">Subtotal</p>
        <p className="">${total}</p>
      </span>
      <span className=" border-b-2 mt-6 flex justify-between">
        <p className="">Shipping:</p>
        <p className="">Free</p>
      </span>
      <span className=" border-b-2 mt-6 flex justify-between">
        <p className="">Total:</p>
        <p className="">${total}</p>
      </span>
      <div className="flex w-full justify-center items-center mt-4">
        <Button className="px-12 py-4  bg-[#DB4444] rounded-none text-white">
          Procees to checkout
        </Button>
      </div>
    </div>
  );
};
