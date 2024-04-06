import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { moocs, year } from "./data";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

type Props = {};
function checkIfFilesAreTooBig(files?: any) {
  let valid = false;
  if (files) {
    const size = files.size;
    if (size <= 524288) {
      valid = true;
    }
  }
  return valid;
}

function checkIfFilesAreCorrectType(files?: any) {
  let valid = false;
  if (files) {
    if ("application/pdf" === files.type) {
      valid = true;
    }
  }
  return valid;
}

const schema = Yup.object().shape({
  title: Yup.string().required("please Select Title of Course!"),
  startDate: Yup.date().required("Please enter your Date of Joining!"),
  endDate: Yup.date().required("Please enter your Date of Completion!"),
  year: Yup.string().required("select year!"),
  verificationUrl: Yup.string().required(
    "Please enter Certificate Verfication Url"
  ),
  files: Yup.mixed()
    .nullable()
    .required("Select file")
    .test(
      "is-correct-file",
      "pdf should be less than 500kb.",
      checkIfFilesAreTooBig
    )
    .test(
      "is-big-file",
      "Sorry, only PDF files are supported for upload",
      checkIfFilesAreCorrectType
    ),
});

const MoocsSubmissionForm = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: null,
      endDate: null,
      year: "",
      verificationUrl: "",
      files: null,
    },
    validationSchema: schema,
    onSubmit: ({ title, startDate, endDate, year, verificationUrl, files }) => {
      // await login({ email, password });
      toast.success("All Set!");
      console.log({ title, startDate, endDate, year, verificationUrl, files });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  const [selectedTitle, setSelectedTitle] = useState("");
  const [platform, setPlatform] = React.useState("");
  const [credit, setCredit] = React.useState("");

  const handleTitleChange = (e: any) => {
    setSelectedTitle(e.target.value);
    const moocsSelect = moocs.find((moocs) => moocs.label === e.target.value);
    if (moocsSelect) {
      setFieldValue("title", moocsSelect.id, true);
      setPlatform(moocsSelect.platform);
      setCredit(moocsSelect.credit);
    } else {
      setFieldValue("title", "", true);
      setPlatform("");
      setCredit("");
    }
  };

  // const pdfHandler = async (e: any) => {
  //   const fileReader = new FileReader();
  //   console.log(e.target.files[0]);
  //   fileReader.onload = () => {
  //     if (fileReader.readyState === 0) {
  //       const pdf = fileReader.result;
  //       alert(pdf);
  //     }
  //   };
  // };

  return (
    <div>
      <div className="gradient-bg flex py-2 justify-center items-center rounded-lg">
        <span className="font-semibold text-white">Moocs Submission</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 bg-slate-100 py-3 px-2 my-2 overflow-hidden">
          <div className="col-span-12">
            <span className="font-semibold mx-2 mt-4">Add Moocs Details :</span>
          </div>
          {/* Title Selector  */}
          <div className="flex flex-col col-span-4 max-800px:col-span-5 max-sm:col-span-12">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Course Title
            </span>
            <Select
              label=""
              className="w-full selector-white"
              placeholder="Select Title"
              id="title"
              name="title"
              //   value={values.title}
              onChange={(e: any) => {
                handleTitleChange(e);
                // handleChange("title")(e.target.value);
              }}
            >
              {moocs.map((item) => (
                <SelectItem key={item.value} value={item.value} className="">
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            {errors.title && touched.title && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.title}
              </span>
            )}
          </div>

          {/* Platform selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-7">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Course Platform
            </span>
            <input
              disabled
              type="text"
              name=""
              value={platform}
              // onChange={handleChange}
              id="course_platform"
              placeholder="Course Platform"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
          </div>

          {/* Credit selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-5">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Credit Earned
            </span>
            <input
              disabled
              type="text"
              name=""
              value={credit}
              // onChange={handleChange}
              id="credit_earned"
              placeholder="Credit Earned"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
          </div>

          <div className="col-span-12 grid gap-2 grid-cols-12">
            {/* Start Date selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-6">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                Starting Date
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker
                      name="startDate"
                      value={values.startDate}
                      onChange={(date: any) => {
                        setFieldValue("startDate", date, true);
                      }}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              {errors.startDate && touched.startDate && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.startDate}
                </span>
              )}
            </div>

            {/* Start Date selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-6">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1  after:ml-0.5 after:text-red-500 after:content-['*']">
                Completion Date
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker
                      name="endDate"
                      value={values.endDate}
                      onChange={(date: any) => {
                        setFieldValue("endDate", date, true);
                      }}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              {errors.endDate && touched.endDate && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.endDate}
                </span>
              )}
            </div>
          </div>

          {/* Year selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-4">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*'] ">
              Year
            </span>
            <Select
              label=""
              className="w-full  selector-white"
              placeholder="Select Title"
              id="year"
              name="year"
              value={values.year}
              onChange={(e: any) => {
                handleChange("year")(e.target.value);
              }}
            >
              {year.map((year) => (
                <SelectItem key={year.value} value={year.value} className="">
                  {year.label}
                </SelectItem>
              ))}
            </Select>
            {errors.year && touched.year && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.year}
              </span>
            )}
          </div>

          {/* Verification url input  */}
          <div className="flex flex-col col-span-3 max-800px:col-span-4 max-sm:col-span-8">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*'] ">
              Verification Url
            </span>
            <input
              type="text"
              name=""
              value={values.verificationUrl}
              onChange={handleChange}
              id="verificationUrl"
              placeholder="Verification url"
              className={`
              input !mt-0 !bg-white text-[.88rem] `}
            />
            {errors.verificationUrl && touched.verificationUrl && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.verificationUrl}
              </span>
            )}
          </div>

          <div className="col-span-12 grid grid-cols-12">
            {/* Upload button  */}
            <div className="flex flex-col col-span-4 max-800px:col-span-6 max-sm:col-span-12">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                Certificate
              </span>
              <input
                type="file"
                name="file"
                id="file"
                className=" block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                accept="application/pdf"
                onChange={(event: any) => {
                  setFieldValue("files", event.target.files[0], true);
                }}
              />
              {errors.files && touched.files && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.files}
                </span>
              )}
              {/* <Button
                startContent={<FaCloudUploadAlt className="text-slate-600" />}
                className="!bg-white border-1 rounded-sm"
              >
                Upload
              </Button> */}
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12">
            {/* <input type="file" className="" /> */}
            <Button
              color="primary"
              className="!rounded-md gradient-bg my-4 col-span-1 "
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MoocsSubmissionForm;
