"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  useDisclosure,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { adminData } from "../../../data/admin";
import { columns } from "../../../constants/columns";
import MButton from "../../../Component/Buttons/MButton";
import AddProduct from "../../../Component/admin/AddProduct";
import { useGetProductQuery } from "../../../Slices/admin/product";
import { useGetCategoryByTypeQuery } from "../../../Slices/admin/category";
import Image from "next/image";
import { Images } from "@/constants";

export default function Admin() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit, onOpenChange:onOpenChangeEdit } = useDisclosure();
  const { data, error, isLoading, refetch } = useGetProductQuery();
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (data?.data?.length) {
      const modifiedData = data?.data.map((item, i) => ({
        ...item,
        key: i,
      }));
      setProducts(modifiedData);
    }
  }, [data?.data?.length]);

  const handleEdit = (data) => {
    setEditData(data)
    onOpenEdit()
  }

  const renderCell = React.useCallback((user, columnKey, handleEdit) => {
    const cellValue = user[columnKey];

    console.log(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.mediaSchema?.[0]?.url}`,
      "wdfwdwsdsdcd"
    );

    switch (columnKey) {
      case "image":
        return (
          <Image
            alt="Card background"
            className="object-cover"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.mediaSchema?.[0]?.url}`}
            width={60}
            height={60}
          />
        );
      case "actions":
        return (
          <div class="relative flex items-center gap-2">
            <span class="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={Images.eye} />
            </span>
            <span class="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(user)}>
              <Image src={Images.pen.src} width={20} height={20} />
            </span>
            <span class="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={Images.bin.src} width={20} height={20} />
            </span>
          </div>
        );
      default:
        return <>{cellValue}</>;
    }

    return <></>;
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedKeys, setSelectedKeys] = useState(new Set(["2"]));
  console.log(products?.length, "products?.length");
  return (
    <div className="p-6">
      <AddProduct
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        refetch={refetch}
      />
      <AddProduct
        isOpen={isOpenEdit}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
        refetch={refetch}
        data={editData}
      />
      <div className="flex justify-end w-full mb-4">
        <MButton
          classNam=""
          title="Add Product"
          click={onOpen}
          variant="solid"
          color="primary"
        />
      </div>
      {products?.length ? (
        <>
          <Table
            aria-label="Controlled table example with dynamic content"
            // selectionMode="multiple"
            // disabledKeys={["3", "4"]}
            // selectedKeys={selectedKeys}
            // onSelectionChange={setSelectedKeys}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={products}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey, handleEdit)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
