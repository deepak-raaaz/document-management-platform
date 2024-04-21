import React, { FC } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  layout: any;
  setLayout: (open: any) => void;
  component: any;
  route?:string;
  setRoute?: (route: string) => void;
  pdfUrl?:string;
  verificationUrl?:string;
  id?:string;
  data?:any;
};

const ExportPdfViewModal: FC<Props> = ({
  layout,
  setLayout,
  setRoute,
  route,
  component: Component,
  pdfUrl,
  verificationUrl,
  id,
  data
}) => {
//   const theme = useTheme();
//   const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
//   if(!greaterThanMid){
//     setLayout("fullscreen");
//   } else {
//     setLayout("center");
//   }
  return (
    <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          {/* <DialogTitle>Filters</DialogTitle> */}
          <div className={`m-auto  container max-w-screen-1200px h-full `}>
          <Component setRoute={setRoute} pdfUrl={pdfUrl} verificationUrl={verificationUrl} id={id} data={data}/>
        </div>
        </ModalDialog>
      </Modal>
  );
};

export default ExportPdfViewModal;