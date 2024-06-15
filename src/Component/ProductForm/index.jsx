import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Drawer from "../Drawer";

const validationSchema = Yup.object().shape({
  isActive: Yup.string().required("Required"),
  brandId: Yup.number().required("Required"),
  productName: Yup.string().required("Required"),
});

const Index = () => {
  return (
    <>
      <Drawer
        width={"full"}
        header={"Add product"}
        hideModal={() => {}}
        isLoading={false}
        children={
          <div>
            <h1>Add Product</h1>
            <Formik
              initialValues={{ isActive: "", brandId: "", productName: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="isActive"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Is Active
                  </label>
                  <Field
                    name="isActive"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  <ErrorMessage
                    name="isActive"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brand ID
                  </label>
                  <Field
                    name="brandId"
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  <ErrorMessage
                    name="brandId"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <Field
                    name="productName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  <ErrorMessage
                    name="productName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        }
      />
    </>
  );
};

export default Index;
