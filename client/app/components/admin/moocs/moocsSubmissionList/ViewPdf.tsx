import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const ViewPdf: FC<Props> = ({ setRoute }) => {
  const pdfURL =
    "https://res.cloudinary.com/dxmvkaoql/image/upload/v1710010310/documents/q5ztqsq1yoyth8yx8zul.pdf";

  return (
    <div className="h-[80vh]">
      <h3 className="font-semibold text-lg text-slate-800">Certificate</h3>
      <div className="h-[58vh] mt-4">
        <iframe src={pdfURL} width="100%" height="100%" />
      </div>
      <div className="flex flex-col my-2 ">
        <label className="text-slate-600 ">Verification Url</label>
        <a
          href="https://res.cloudinary.com/dxmvkaoql/image/upload/v1710010310/documents/q5ztqsq1yoyth8yx8zul.pdf"
          className="font-medium text-blue-500" target="blank"
        >
          https://res.cloudinary.com/dxmvkaoql/image/upload/v1710010310/documents/q5ztqsq1yoyth8yx8zul.pdf
        </a>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          size="md"
          variant="solid"
          className="bg-green-600 font-semibold text-white"
          // onPress={setRoute("")}
          onClick={() => {
            setRoute("a");
            toast.success("Verify Successfully!");
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default ViewPdf;
