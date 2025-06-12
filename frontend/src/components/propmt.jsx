import { createPortal } from "react-dom";

const Prompt = ({ open, children, className }) => {
  if (!open) return null;
  return (
    <>
      {createPortal(
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-50 z-0"></div>
          <div className={`bg-white z-10 ${className}`}>{children}</div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Prompt;
