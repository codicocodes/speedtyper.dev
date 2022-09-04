import React, { useRef } from "react";

const ProgressBar = ({
  progress,
  me,
  // placement,
  name,
}: {
  progress: number;
  name: string;
  me: boolean;
  placement: number;
}) => {
  const hoverColor = me ? "hover:bg-purple-600" : "hover:bg-purple-300";

  const meRef = useRef(null);

  return (
    <div
      className={`flex flex-row items-center align-middle text-md border-l-8  ${
        me ? "border-purple-400" : "border-transparent"
      } p-2 pl-4`}
      ref={me ? meRef : null}
    >
      {
        <span
          className={`text-off-white ${hoverColor} mr-2`}
          style={{
            width: "150px",
            display: "block",
            textAlign: "left",
            maxWidth: "150px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </span>
      }

      <progress
        style={{ transition: "width 1s ease" }}
        max={100}
        value={Math.floor(progress)}
      ></progress>
    </div>
  );
};

export default ProgressBar;
