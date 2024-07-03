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
import AddList from "../../../Component/admin/AddList";
import { useGetListQuery } from "../../../Slices/admin/list";

const List = () => {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { data, error, isLoading, refetch } = useGetListQuery();
    const [list, setList] = useState([]);
  
    useEffect(() => {
      if (data?.data?.length) {
        const modifiedData = data?.data.map((item, i) => ({
          ...item,
          key: i,
        }));
        setList(modifiedData)
      }
    }, [data?.data?.length]);

    
  return (
    <div className="p-6">
      <AddList isOpen={isOpen} onOpen={onOpen} onClose={onClose} refetch={refetch} />
      <div className="flex justify-end w-full mb-4">
        <MButton
          classNam=""
          title="Add Category"
          click={onOpen}
          variant="solid"
          color="primary"
        />
      </div>
      {list?.length ? (
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
            <TableBody items={list  }>
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

export default List