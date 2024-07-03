import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  input,
  Input,
} from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useAddListMutation } from "../../Slices/admin/list";
import { useGetProductQuery } from "../../Slices/admin/product";
import MButton from "../Buttons/MButton";

export default function AddList({ isOpen, onOpen, onClose, refetch }) {
  const [addList, { isLoading, isSuccess, isError }] = useAddListMutation();
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
  } = useGetProductQuery();
  console.log(dataProduct?.data, "dataProduct");

  const initialValues = {
    name: "",
    products: [],
  }

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add List</ModalHeader>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                const body = {
                  name: values.name,
                  products: values.products,
                };
                await addList(body)
                  .unwrap()
                  .then(() => {
                    refetch();
                    onClose();
                  });
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <ModalBody className="overflow-y-auto h-[750px]">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Main Product Fields */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="categoryName">Category Name</label>
                        <Field
                          as={Input}
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="mainCategory">Select Type</label>
                        <Select
                          label="Products"
                          selectionMode="multiple"
                          placeholder="Select products"
                          // selectedKeys={values.products.map(
                          //   (product) => product.key
                          // )}
                          className="w-full"
                          onSelectionChange={(selectedItems) => {
                            const selectedProducts = [];
                            selectedItems?.forEach((item) => {
                              selectedProducts.push(item);
                            })
                            setFieldValue(
                              "products",
                              selectedProducts
                            );
                          }}
                        >
                          {dataProduct?.data?.map((item) => (
                            <SelectItem key={item.productId} value={item.productId}>
                              {`${item.productName} - ${item.brandName}`}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex justify-end w-full mb-4">
                      <MButton
                        type="submit"
                        classNam=""
                        title="Submit"
                        variant="solid"
                        color="primary"
                      />
                    </div>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
