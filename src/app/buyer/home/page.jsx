"use client"

import BannerSlider from "@/Component/BannerSlider";
import MBrowseByCategory from "@/Component/BrowseByCategory";
import Enhance from "@/Component/Enhance";
import NewArrival from "@/Component/NewArrival";
import Section from "@/Component/Section";
import SectionSlider from "@/Component/SectionSlider";
import Service from "@/Component/Service";
import Sidenav from "@/Component/SideNav";
import { useGetListProductsQuery, useGetListQuery } from "@/Slices/admin/list";
import { Images } from "@/constants";
import { browseByCategory, ourProducts } from "@/data/homePage";
import React from "react";

const page = () => {
  const { data, error, isLoading, refetch } = useGetListQuery({});
  const {
    data: listProduct,
    error: listError,
    isLoading: listIsLoading,
    refetch: listRefetch,
  } = useGetListProductsQuery(
    { id: data?.data?.[0]?.id },
    { skip: !data?.count }
  );

   const {
    data: listProductII,
    error: listErrorII,
    isLoading: listIsLoadingII,
    refetch: listRefetchII,
  } = useGetListProductsQuery(
    { id: data?.data?.[1]?.id },
    { skip: !data?.count }
  );
  return (
    <main className="">
      {/* <About /> */}
      {/* <div className="text-red-500">hello</div> */}
      {/* <ProductForm /> */}
      <div className="px-24 w-full">
        <div className="flex gap-10 px-10 mb-16">
          <Sidenav />
          <BannerSlider
            list={[
              { name: "phone", img: Images.banner1 },
              { name: "phone", img: Images.banner1 },
              { name: "phone", img: Images.banner1 },
              { name: "phone", img: Images.banner1 },
              { name: "phone", img: Images.banner1 },
            ]}
          />
        </div>
        <div>{/* <ProductForm />  */}</div>
        <SectionSlider
          title="Flash Sale"
          subTitle="Today's"
          buttonText="View More"
          data={listProductII?.data}
        />
        <Section
          title={data?.data?.[0]?.name}
          subTitle="This Month"
          buttonText="View More"
          data={listProduct?.data}
        />
        <hr className="border" />
        <div className="!px-10 !py-6 my-10 w-full ">
          <MBrowseByCategory
            className=""
            title="Browse By Category"
            subTitle="Categories"
            data={browseByCategory}
          />
        </div>
        <div className="px-10 w-full my-16">
          <Enhance />
        </div>
        <Section
          title="Explore Our Products"
          subTitle="Our Products"
          buttonText="View More"
          data={ourProducts}
          // isMinimalCard={true}
        />
        <NewArrival
          title="New Arrival"
          subTitle="Featured"
          showButton={false}
          buttonText=""
        />
        <hr className="my-3" />
        <Service />
      </div>
    </main>
  );
};

export default page;
