import { CheckmarkIcon, Toast, toast } from "react-hot-toast";
import { useEffect } from "react";
import ExclamationIcon from "../Icons/ExclamationIcon";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

type ToatsType = "success" | "error";

interface ICustomToast {
  /**
   * A `Toast` object from the `react-hot-toast` library that represents the current toast.
   */
  t: Toast;
  /**
   * A string that indicates the type of the toast, either `success` or `error`.
   */
  type: ToatsType;
  /**
   * An optional string or function that represents the message to be displayed in the toast.
   */
  message?: string | (() => JSX.Element);
  /**
   * A string that represents the title of the toast.
   */
  title: string;
  /**
   * An optional array of objects that represent buttons to be displayed in the toast.
   * Each object has a `label` string and an optional `onClick` function. If `onClick` is
   * omitted, `dismissToast` will be called by default when clicked on the button.
   *
   * If buttons are not passed as prop, default `Close` button is rendered.
   */
  buttons?: {
    label: string;
    onClick?: () => void;
  }[];

  /**
 * A custom toast notification that displays a message without title.
 * It uses the `react-hot-toast` library and two custom icons: `CheckCircleIcon` and `ExclamationIcon`.
 */
  singleLineMessage?: boolean;


    /**
 * For hideing the toast automatically after given time interval.
 * It uses the `react-hot-toast` library and two custom icons: `CheckCircleIcon` and `ExclamationIcon`.
 */
  autoHide?:boolean;
}

/**
 * A custom toast notification that displays a message with a title and some optional buttons.
 * It uses the `react-hot-toast` library and two custom icons: `CheckCircleIcon` and `ExclamationIcon`.
 */
const CustomToastEducation: React.FC<ICustomToast> = ({
  t,
  type,
  message,
  title,
  buttons,
  singleLineMessage,
  autoHide
}) => {
  /**
   * Dismisses the current toast.
   */
  const dismissToast = () => {
    toast.dismiss(t.id);
  };

  useEffect(()=>{
    if(autoHide){
        setTimeout(dismissToast, 3000)
    }
  },[])

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
                <span className={`${type==="success"? "text-green-500" : "text-red-500"}`}>
                {message}
                </span>
              </div>
            ) : (
              message && message()
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
              message && message()
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
