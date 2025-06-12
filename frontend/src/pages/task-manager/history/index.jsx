import { useEffect, useState } from "react";
import { Prompt } from "../../../components";

const History = ({ data, isLoading }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data || isLoading) {
      if (!open) setOpen((prev) => true);
    }
  }, [data, isLoading]);
  return (
    <Prompt
      open={open}
      className={
        "w-5/12 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] max-h-[600px] overflow-scroll"
      }
    >
      {isLoading && <div>loading...</div>}
      {!isLoading && data && (
        <div className="flex flex-col">
          <div className="px-4 py-3 border-b">dfsfs</div>
          <div className="flex-1 py-3 px-4"> xyz</div>
        </div>
      )}
    </Prompt>
  );
};

export default History;
