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
} from "@nextui-org/react";
import { adminData } from "../../../data/admin";
import { categoryColumns, columns } from "../../../constants/columns";
import MButton from "../../../Component/Buttons/MButton";
import AddCategory from "../../../Component/admin/AddCategory";
import { useGetCategoryQuery } from "../../../Slices/admin/category";

export default function Admin() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data, error, isLoading, refetch } = useGetCategoryQuery();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data?.data?.length) {
      const modifiedData = data?.data.map((item, i) => ({
        ...item,
        key: i,
      }));
      setCategory(modifiedData)
    }
  }, [data?.data?.length]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedKeys, setSelectedKeys] = useState(new Set(["2"]));

  console.log(category, "category")
  return (
    <div className="p-6">
      <AddCategory isOpen={isOpen} onOpen={onOpen} onClose={onClose} refetch={refetch} />
      <div className="flex justify-end w-full mb-4">
        <MButton
          classNam=""
          title="Add Category"
          click={onOpen}
          variant="solid"
          color="primary"
        />
      </div>
      {category?.length ? (
        <>
          <Table
            aria-label="Controlled table example with dynamic content"
            // selectionMode="multiple"
            // disabledKeys={["3", "4"]}
            // selectedKeys={selectedKeys}
            // onSelectionChange={setSelectedKeys}
          >
            <TableHeader columns={categoryColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={category}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
