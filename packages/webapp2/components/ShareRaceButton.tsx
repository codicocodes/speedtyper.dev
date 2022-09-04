import getConfig from "next/config";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareRaceButton = ({ gameId }: { gameId: string }) => {
  const { publicRuntimeConfig: { siteRoot } } = getConfig()
  const privateurl = `${siteRoot}/play/?mode=private&id=${gameId}`;

  function copyToClipboard() {
    navigator.clipboard.writeText(privateurl);
    toast.dark("Copied to clipboard!");
  }

  return (
    <>
      <button
        className="border border-gray-200 flex items-center ml-4 py-2 px-4 hover:bg-purple-300 cursor-pointer bg-purple-400 my-4 rounded"
        onClick={copyToClipboard}
      >
        <svg
          height="20"
          viewBox="0 0 128 128"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          id="fi_4469818"
        >
          <path d="m118.786 23.732a1.893 1.893 0 0 0 -.479-.9l-22.32-22.322a1.811 1.811 0 0 0 -1.237-.51h-41.043a7.759 7.759 0 0 0 -7.75 7.75v10.635h-10.638a7.759 7.759 0 0 0 -7.75 7.75v10.638h-10.638a7.759 7.759 0 0 0 -7.75 7.75v75.724a7.758 7.758 0 0 0 7.75 7.75h57.362a7.759 7.759 0 0 0 7.75-7.75v-10.638h10.638a7.759 7.759 0 0 0 7.75-7.75v-10.638h10.638a7.759 7.759 0 0 0 7.75-7.75v-59.4a1.689 1.689 0 0 0 -.033-.339zm-22.286-17.76 8.172 8.172 8.172 8.172h-16.344zm-17.957 114.275a4.255 4.255 0 0 1 -4.25 4.25h-57.362a4.255 4.255 0 0 1 -4.25-4.25v-75.724a4.255 4.255 0 0 1 4.25-4.25h10.638v67.586a1.75 1.75 0 0 0 1.75 1.75h49.224zm18.388-18.388a4.255 4.255 0 0 1 -4.25 4.25h-61.612v-79.974a4.255 4.255 0 0 1 4.25-4.25h10.638v67.586a1.75 1.75 0 0 0 1.75 1.75h49.224zm14.138-14.138h-61.612v-79.974a4.255 4.255 0 0 1 4.25-4.25h39.293v20.569a1.749 1.749 0 0 0 1.75 1.75h20.569v57.655a4.255 4.255 0 0 1 -4.25 4.25z"></path>
        </svg>
        <p className="pl-2">Copy</p>
      </button>
    </>
  );
};

export default ShareRaceButton
