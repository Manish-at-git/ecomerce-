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
import { useAddCategoryMutation } from "../../Slices/admin/category";
import MButton from "../Buttons/MButton";

export default function AddCategory({ isOpen, onOpen, onClose, refetch }) {
  const [images, setImage] = useState("");
  const [addCategory, { isLoading, isSuccess, isError }] =
    useAddCategoryMutation();

  const initialValues = {
    brand: "",
    mainCategory: "",
    subCategory: "",
    productCode: "",
    productDescription: "",
    productName: "",
    tags: "",
    productId: "",
    offerPrice: 0,
    price: 0,
    discount: 1231231,
    totalStock: 1231230,
    qtyUnit: "",
    packageUnit: "",
    variantInfo: "qweqw",
    variantName: "",
    variantList: {
      offerPrice: 0,
      price: 0,
      discount: 0,
      totalStock: 0,
      qtyUnit: "string",
      packageUnit: "string",
      variantInfo: "string",
      variantName: "string",
      variantDraftId: 0,
      variantId: 0,
    },
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImage(blobUrl);
    }
  };

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Category
            </ModalHeader>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                const body = {
                  name: values.categoryName,
                  type: values.type,
                };
                console.log(body);
                await addCategory(body)
                  .unwrap()
                  .then(() => {
                    refetch();
                    onClose();
                  });
                // ;
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
                          name="categoryName"
                          value={values.categoryName}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="mainCategory">
                          Select Type
                        </label>
                        <Field
                          as={Select}
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                        >
                          <SelectItem key="main" value="main">
                            Main Category
                          </SelectItem>
                          <SelectItem key="sub" value="sub">
                            Sub Category
                          </SelectItem>
                        </Field>
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
