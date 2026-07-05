import React, { useEffect, useState } from "react";
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
import { useAddProductMutation } from "../../Slices/admin/product";
import { useGetCategoryByTypeQuery } from "../../Slices/admin/category";
import { useGetBrandQuery } from "../../Slices/admin/brand";
import MButton from "../Buttons/MButton";
import ImageUpload from "../Upload";

export default function AddProduct({ isOpen, onOpen, onClose, refetch, data }) {
  console.log(data, "dataaaa");

  const [imagePaths, setImagePaths] = useState("");

  useEffect(() => {
    setImagePaths(data?.mediaSchema)
  }, [data])
  
  console.log(imagePaths, "imagePOaths")
  const {
    data: mainCategories,
    error: mainCategoriesError,
    isLoading: mainCategoriesIsLoading,
    refetch: mainCategoriesRefetch,
  } = useGetCategoryByTypeQuery({ type: "main" });

  const {
    data: subCategories,
    error: subCategoriesError,
    isLoading: subCategoriesIsLoading,
    refetch: subCategoriesRefetch,
  } = useGetCategoryByTypeQuery({ type: "sub" });

  const {
    data: brands,
    error: brandError,
    isLoading: brandsIsLoading,
    refetch: brandRefetch,
  } = useGetBrandQuery();

  console.log(mainCategories, subCategories, "subCategories");
  const [addProduct, { isLoading, isSuccess, isError }] =
    useAddProductMutation();

  const [
    editProduct,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
    },
  ] = useAddProductMutation();

  const initialValues = {
    isActive: data?.isActive ?? "Y",
    brandId: data?.brandName ?? "",
    groupCategoryId: data?.groupCategoryId ?? "",
    mainCategoryId: data?.mainCategoryId ?? "",
    productCode: data?.productCode ?? "",
    productDescription: data?.productDescription ?? "",
    productName: data?.productName ?? "",
    tags: data?.tags ?? "",
    productDraftId: data?.productDraftId ?? 0,
    offerPrice: data?.offerPrice ?? 99.99,
    price: data?.price ?? 129.99,
    discount: data?.discount ?? 30,
    totalStock: data?.totalStock ?? 100,
    mediaSchema: [
      {
        type: "image",
        url: "",
      },
    ],
  };

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Product
            </ModalHeader>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                debugger;
                const images = imagePaths?.map((image) => {
                  return {
                    type: "image",
                    url: image,
                  };
                });

                const body = {
                  isActive: "Y",
                  brandId: values.brand,
                  groupCategoryId: values.mainCategory,
                  mainCategoryId: values.subCategory,
                  productCode: values.productCode,
                  productDescription: values.productDescription,
                  productName: values.productName,
                  tags: values.tags,
                  productId: "auto-generated", //values.productId,
                  productDraftId: 0,
                  offerPrice: 99.99,
                  price: 129.99,
                  discount: 30,
                  totalStock: 100,
                  mediaSchema: images,
                };
                console.log(body);
                if (data) {
                  await editProduct(body)
                    .unwrap()
                    .then(() => {
                      refetch();
                      onClose();
                    });
                } else {
                  await addProduct(body)
                    .unwrap()
                    .then(() => {
                      refetch();
                      onClose();
                    });
                }
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <ModalBody className="overflow-y-auto h-[750px]">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Main Product Fields */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="brand">Select Brand</label>
                        {/* <Field
                          as={Select}
                          name="brand"
                          value={values.brand}
                          onChange={handleChange}
                        >
                          {brands?.data?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.name}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </Field> */}
                        <Field
                          as={Select}
                          name="brand"
                          value="177bb9fb-73e7-4e19-a226-eae7f7fd6b34"
                          onChange={handleChange}
                        >
                          {brands?.data?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.name}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </Field>
                        <div className="bg-red-500 w-fit text-white px-2 rounded">
                          {data?.brandName}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="mainCategory">
                          Select Main Category
                        </label>
                        <Field
                          as={Select}
                          name="mainCategory"
                          value={values.mainCategory}
                          onChange={handleChange}
                        >
                          {mainCategories?.data?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.name}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </Field>
                        <div className="bg-red-500 w-fit text-white px-2 rounded">
                          {data?.mainCategoryName}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="subCategory">Select Sub Category</label>
                        <Field
                          as={Select}
                          name="subCategory"
                          value={values.subCategory}
                          onChange={handleChange}
                        >
                          {subCategories?.data?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.name}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </Field>
                        <div className="bg-red-500 w-fit text-white px-2 rounded">
                          {data?.subCategoryName}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="productCode">Product Code</label>
                        <Field
                          as={Input}
                          name="productCode"
                          value={values.productCode}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="productDescription">
                          Product Description
                        </label>
                        <Field
                          as={Input}
                          name="productDescription"
                          value={values.productDescription}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="productName">Product Name</label>
                        <Field
                          as={Input}
                          name="productName"
                          value={values.productName}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="tags">Tags</label>
                        <Field
                          as={Input}
                          name="tags"
                          value={values.tags}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="productId">Product ID</label>
                        <Field
                          as={Input}
                          name="productId"
                          value={values.productId}
                          onChange={handleChange}
                          type="text"
                        />
                      </div> */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="offerPrice">Offer Price</label>
                        <Field
                          as={Input}
                          name="offerPrice"
                          value={values.offerPrice}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="price">Price</label>
                        <Field
                          as={Input}
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="discount">Discount</label>
                        <Field
                          as={Input}
                          name="discount"
                          value={values.discount}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="totalStock">Total Stock</label>
                        <Field
                          as={Input}
                          name="totalStock"
                          value={values.totalStock}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="qtyUnit">Quantity Unit</label>
                        <Field
                          as={Input}
                          name="qtyUnit"
                          value={values.qtyUnit}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="packageUnit">Package Unit</label>
                        <Field
                          as={Input}
                          name="packageUnit"
                          value={values.packageUnit}
                          onChange={handleChange}
                          type="text"
                        />
                      </div> */}
                      <ImageUpload
                        imagePaths={imagePaths}
                        setImagePaths={setImagePaths}
                        data={data?.mediaSchema}
                      />
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="variantInfo">Variant Info</label>
                        <Field
                          as={Input}
                          name="variantInfo"
                          value={values.variantInfo}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantName">Variant Name</label>
                        <Field
                          as={Input}
                          name="variantName"
                          value={values.variantName}
                          onChange={handleChange}
                          type="text"
                        />
                      </div> */}

                      {/* Variant List Fields */}
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.offerPrice">Variant Offer Price</label>
                        <Field
                          as={Input}
                          name="variantList.offerPrice"
                          value={values.variantList.offerPrice}
                          onChange={handleChange}
                          type="number"
                        />
                      </div> */}
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.price">Variant Price</label>
                        <Field
                          as={Input}
                          name="variantList.price"
                          value={values.variantList.price}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.discount">Variant Discount</label>
                        <Field
                          as={Input}
                          name="variantList.discount"
                          value={values.variantList.discount}
                          onChange={handleChange}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.totalStock">Variant Total Stock</label>
                        <Field
                          as={Input}
                          name="variantList.totalStock"
                          value={values.variantList.totalStock}
                          onChange={handleChange}
                          type="number"
                        />
                      </div> */}
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.qtyUnit">Variant Quantity Unit</label>
                        <Field
                          as={Input}
                          name="variantList.qtyUnit"
                          value={values.variantList.qtyUnit}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.packageUnit">Variant Package Unit</label>
                        <Field
                          as={Input}
                          name="variantList.packageUnit"
                          value={values.variantList.packageUnit}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.variantInfo">Variant Info</label>
                        <Field
                          as={Input}
                          name="variantList.variantInfo"
                          value={values.variantList.variantInfo}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.variantName">Variant Name</label>
                        <Field
                          as={Input}
                          name="variantList.variantName"
                          value={values.variantList.variantName}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.variantDraftId">Variant Draft ID</label>
                        <Field
                          as={Input}
                          name="variantList.variantDraftId"
                          value={values.variantList.variantDraftId}
                          onChange={handleChange}
                          type="number"
                        />
                      </div> */}
                      {/* <div className="flex flex-col gap-2">
                        <label htmlFor="variantList.variantId">Variant ID</label>
                        <Field
                          as={input}
                          // name="variantList.variantId"
                          // value={values.variantList.variantId}
                          onChange={handleChange}
                          type="number"
                        />
                      </div> */}
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
