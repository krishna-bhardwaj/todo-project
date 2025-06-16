import { Prompt, SecondaryActionButton } from "../../../components";
import { XCircle } from "lucide-react";
import { formatTimestamp } from "../../../utils";

const History = ({ data, isLoading, ...props }) => {
  return (
    <Prompt
      open={props.open}
      className={
        "w-5/12 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] max-h-[600px] overflow-scroll min-w-[430px] max-w-[600px]"
      }
    >
      {isLoading && <div>loading...</div>}
      {!isLoading && data && (
        <div className="flex flex-col">
          <div className="px-4 py-3 border-b flex justify-between items-center gap-3">
            <div className="flex gap-3 items-center">
              <span className="text-2xl">{props.taskName}</span>
              <span className="text-xl text-gray-500 italic">
                {props.taskStatus}
              </span>
            </div>
            <SecondaryActionButton
              icon={<XCircle />}
              label="Close History"
              onClick={props.onClose}
            />
          </div>
          <div className="flex-1 py-3 px-4 flex gap-1 flex-col">
            {data.map((item) => (
              <div
                className="flex justify-between items-center gap-2"
                key={item.id}
              >
                <div className="flex gap-1 overflow-x-auto scrollbar-hide flex-1">
                  <span>{item.name}</span>
                  {item.metaData?.from && item.metaData?.to && (
                    <span
                      className="flex gap-1 whitespace-nowrap"
                      title={`${item.name} from ${item.metaData.from} to ${item.metaData.to}.`}
                    >
                      <span>from</span>
                      <span className="font-semibold">
                        {item.metaData.from}
                      </span>
                      <span>to</span>
                      <span className="font-semibold">{item.metaData.to}</span>
                    </span>
                  )}
                </div>
                <span className="tabular-nums text-sm">
                  {formatTimestamp(item.timeStamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Prompt>
  );
};

export default History;
