import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { animals, year } from "./data";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { FaCloudUploadAlt } from "react-icons/fa";

type Props = {};

const InputTable = (props: Props) => {
  return (
    <form>
      <Table
        aria-label="Example static collection table"
        className="head-bg custom-table"
      >
        <TableHeader className="">
          <TableColumn className="!bg-transparent !text-white !w-2 !min-w-2 !pr-0 text-center">
            Sl. No.
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white !min-w-[20rem] text-center">
            Title
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white !max-w-[5rem] text-center">
            Platform
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
            Credit Earned
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
            Date of Joining
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white text-center">
            Date of Completion
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white text-center !w-[8rem] !max-w-[8rem]">
            Year
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white text-center">
            Verification Url
          </TableColumn>
          <TableColumn className="!bg-transparent !text-white text-center">
            Document Upload
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1" className="!bg-slate-100">
            <TableCell className="!text-center !px-1">1.</TableCell>
            <TableCell className="!px-1">
              <Select
                label=""
                className="w-full selector-white"
                placeholder="Select Title"
              >
                {animals.map((animal) => (
                  <SelectItem
                    key={animal.value}
                    value={animal.value}
                    className=""
                  >
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="!px-1">
              <button className="bg-white px-3 !min-h-unit-10 border-1  w-full">
                Coursera
              </button>
            </TableCell>
            <TableCell className="min-w-[5rem]">
              <input
                type="number"
                name=""
                // value={values.email}
                // onChange={handleChange}
                id="verification_url"
                placeholder="Credit"
                className={` input !mt-0 !bg-white text-center`}
              />
              {/* <button className="bg-white px-3 !min-h-unit-10 border-1  w-full">
                2
              </button> */}
            </TableCell>
            <TableCell className="!px-1 width-style !max-w-[9rem] min-w-[9rem] !w-[9rem]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </TableCell>
            <TableCell className="!px-1 width-style !max-w-[9rem] min-w-[9rem] !w-[9rem]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </TableCell>
            <TableCell className="!px-1">
              <Select
                label=""
                className="w-full max-w-[7rem] min-w-[6rem] selector-white"
                placeholder="Select Title"
              >
                {year.map((year) => (
                  <SelectItem key={year.value} value={year.value} className="">
                    {year.label}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="!px-1">
              <input
                type="text"
                name=""
                // value={values.email}
                // onChange={handleChange}
                id="verification_url"
                placeholder="Verification url"
                className={` input !mt-0 !bg-white`}
              />
            </TableCell>
            <TableCell>
              <Button
                startContent={<FaCloudUploadAlt className="text-slate-600"/>}
                className="!bg-white border-1 rounded-sm"
              >
                Upload
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {/* <input type="file" className="" /> */}
      <Button color="primary" className="!rounded-md gradient-bg my-4" >
        Save
      </Button>
    </form>
  );
};

export default InputTable;
