import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

  // Check for null or undefined values and provide default values
    const validUsername = username ?? '';
    const validEmail = email ?? '';
    const validPassword = password ?? '';

  register(validUsername, validEmail, validPassword).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-gray-200 rounded-lg shadow-xl lg:max-w-xl">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="mb-4">
                  <label htmlFor="username" className="mt-5 block text-md font-semibold text-gray-800"> Username </label>
                  <Field name="username" type="text" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gray-300 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="mt-5 block text-md font-semibold text-gray-800"> Email </label>
                  <Field name="email" type="email" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gray-300 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="mt-5 block text-md font-semibold text-gray-800"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gray-300 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <button type="submit" className="bg-white text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100 block mx-auto">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="mb-4">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;