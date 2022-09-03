import { Link } from "@reach/router";
import React from "react";

export default ({
  loadingFailed,
  connectionFailed,
  errorMessage,
}: {
  loadingFailed: boolean;
  connectionFailed: boolean;
  errorMessage?: string;
}) => {
  let error = "";

  if (connectionFailed) {
    error = "Failed to connect to the server.";
  }

  if (loadingFailed) {
    error = "Failed loading the challenge." + errorMessage;
  }

  return error ? (
    <div className="flex w-full flex-col mb-4 font-light tracking-wider justify-center items-center bg-red-600 text-off-white rounded-lg p-12">
      <span className="text-2xl ">{errorMessage}</span>
      <span className="mt-4 text-sm">
        If this is a recurring problem, consider reporting it on the community
        discord
      </span>

      <Link to="/" className="font-gray-800">
        Navigate to home page
      </Link>
    </div>
  ) : null;
};
