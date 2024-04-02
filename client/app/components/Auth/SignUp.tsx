import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { MdEdit, MdEmail } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("please enter your name!"),
  classroll: Yup.string()
    .required("please enter your class roll number!"),
  universityroll: Yup.string()
    .required("please enter your university roll number!"),
  registration: Yup.string()
    .required("please enter your registration no."),
  year: Yup.string()
    .required("please enter your passing year!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      classroll: "",
      universityroll: "",
      registration: "",
      year: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({
      name,
      email,
      password,
      classroll,
      universityroll,
      registration,
      year,
    }) => {
      const data = {
        name,
        classroll,
        universityroll,
        registration,
        year,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-8 pt-5 pb-8">
      <h1 className="title uppercase">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full relative mt-4 mb-1">
          <label className="label" htmlFor="email">
            Full Name
          </label>
          <MdEmail
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter your full name"
            className={`${
              errors.name && touched.name && "border-red-500"
            } input !ps-10`}
          />
        </div>
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        {/* roll number input  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Class Roll Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.classroll}
            onChange={handleChange}
            id="classroll"
            placeholder="Enter your class roll no."
            className={`${
              errors.classroll && touched.classroll && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.classroll && touched.classroll && (
          <span className="text-red-500 pt-2 block">{errors.classroll}</span>
        )}

        {/* university roll number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            University Roll Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.universityroll}
            onChange={handleChange}
            id="universityroll"
            placeholder="Enter university roll no."
            className={`${
              errors.universityroll &&
              touched.universityroll &&
              "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.universityroll && touched.universityroll && (
          <span className="text-red-500 pt-2 block">
            {errors.universityroll}
          </span>
        )}

        {/* registration number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Registration Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.registration}
            onChange={handleChange}
            id="registration"
            placeholder="Enter registration no."
            className={`${
              errors.registration && touched.registration && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.registration && touched.registration && (
          <span className="text-red-500 pt-2 block">{errors.registration}</span>
        )}

        {/* registration number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Passing Year
          </label>
          <FaCalendar
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.year}
            onChange={handleChange}
            id="year"
            placeholder="Enter year no."
            className={`${
              errors.year && touched.year && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.year && touched.year && (
          <span className="text-red-500 pt-2 block">{errors.year}</span>
        )}

        {/* Email ID  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="email">
            Email ID
          </label>
          <MdEmail
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full relative mt-5 mb-1 ">
          <label className="label" htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } input `}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className="button" />
        </div>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
