import { CheckmarkIcon, Toast, toast } from "react-hot-toast";
import { useEffect } from "react";
import ExclamationIcon from "../Icons/ExclamationIcon";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

type ToatsType = "success" | "error";

interface ICustomToast {
  t: Toast;
  type: ToatsType;
  message?: string | (() => JSX.Element);
  title: string;
  buttons?: {
    label: string;
    onClick?: () => void;
  }[];
  singleLineMessage?: boolean;
  autoHide?: boolean;
}

const CustomToastEducation: React.FC<ICustomToast> = ({
  t,
  type,
  message,
  title,
  buttons,
  singleLineMessage,
  autoHide,
}) => {
  const dismissToast = () => {
    toast.dismiss(t.id);
  };

  useEffect(() => {
    if (autoHide) {
      setTimeout(dismissToast, 3000);
    }
  }, []);

  return (
    <div className="bg-gray-900 relative h-[73px] w-full flex justify-between items-center rounded-xl pl-2 overflow-hidden">
      {singleLineMessage ? (
        <div className="flex flex-col w-full align-middle">
          <div>
            {" "}
            {typeof message === "string" ? (
              <div className="text-[14px] text-green-500 font-medium p-4 flex justify-start items-center gap-3">
                <div>
                  {type === "success" ? (
                    <CheckmarkIcon className="text-green-500 w-[24px] h-[24px]" />
                  ) : (
                    <ExclamationIcon className="text-red-500 w-[24px] h-[24px]" />
                  )}
                </div>
                <span
                  className={`${
                    type === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
                </span>
              </div>
            ) : (
              typeof message === "function" && message()
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full align-middle">
          <div className="flex flex-row align-middle gap-3 w-full pl-5 h-full">
            <div className="flex justify-center items-center gap-2">
              {type === "success" ? (
                <CheckCircleIcon className="text-green-500 w-[18px] h-[18px]" />
              ) : (
                <ExclamationIcon className="text-red-500 w-[18px] h-[18px]" />
              )}
              <h3
                className={`${
                  type === "success" ? "text-green-500" : "text-red-500"
                } text-sm font-semibold`}
              >
                {title}
              </h3>
            </div>
          </div>
          <div>
            {" "}
            {typeof message === "string" ? (
              <p className="text-xs text-gray-400 font-medium pl-[46px]">
                {message}
              </p>
            ) : (
              typeof message === "function" && message()
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col border-l h-full border-gray-700 text-white text-sm font-bold cursor-pointer">
        {buttons ? (
          buttons.map((button: any, index: number) => (
            <div
              key={index}
              className={`w-full px-7 h-full flex flex-col justify-center items-center hover:bg-[#0b101b] ${
                index > 0 && "border-t border-gray-700"
              }`}
              onClick={() =>
                button.onClick ? button.onClick() : dismissToast()
              }
            >
              {button.label}
            </div>
          ))
        ) : (
          <div
            className="w-full px-7 h-full flex flex-col justify-center items-center hover:bg-[#0b101b]"
            onClick={dismissToast}
          >
            Close
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomToastEducation;
