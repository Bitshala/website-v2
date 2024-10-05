import { Snackbar } from "@mui/material";
import { FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";

const Notification = ({
  message,
  url,
}: {
  message: string;
  url: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => setOpen(true), 500);
  }, []);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
    >
      <div className="relative z-10 mt-20 flex items-center rounded-md bg-peach  p-2 text-center md:-mt-1 lg:mr-96 ">
        <a href={url} target="_blank">
          {message}
        </a>
        <a
          href={url}
          target="_blank"
          className="mx-4 rounded-md bg-orange px-2 py-1 text-center hover:bg-black hover:text-orange"
        >
          Lets Go!
        </a>
        <button aria-label="close" onClick={handleClose}>
          <FaWindowClose size="2em" />
        </button>
      </div>
    </Snackbar>
  );
};

export default Notification;
