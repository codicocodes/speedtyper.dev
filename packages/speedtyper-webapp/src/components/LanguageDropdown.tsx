import React, { useState } from "react";
import useLanguages from "../hooks/useLanguages";

export default ({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string | null;
  setSelectedLanguage: any; // we are going to remove this
}): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = useLanguages();

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex my-4 items-center hover:bg-purple-300 cursor-pointer bg-purple-400 py-2 px-4 ml-4 rounded shadow-2xl border-gray-200 border text-dark-ocean"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedLanguage ?? "Language"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {/* <div className="py-1" role="none"> */}

        {showDropdown && (
          <button
            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
            role="menuitem"
            onClick={() => {
              setSelectedLanguage(null);
              setShowDropdown(false);
            }}
          >
            All languages
          </button>
        )}
        {showDropdown &&
          languages.map((language: string, i: number) => {
            return (
              <button
                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                role="menuitem"
                key={i}
                onClick={() => {
                  setSelectedLanguage(language);

                  setShowDropdown(false);
                }}
              >
                {language}
              </button>
            );
          })}
      </div>
      {/* </div> */}
    </div>
  );
};
