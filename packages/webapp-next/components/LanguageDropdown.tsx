import React, { useState } from "react";
import useLanguages from "../hooks/useLanguages";
import Button from "./Button";

const LanguageDropdown = ({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string | null;
  setSelectedLanguage: any; // we are going to remove this
}): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = useLanguages();

  const DownArrowIcon = () => {
    return (
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
    )
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          color="secondary"
          rightIcon={<DownArrowIcon />}
          onClick={() => setShowDropdown(!showDropdown)}
          title="Choose Language"
          text={selectedLanguage ?? "Language"}
        />
      </div>

      <div
        className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
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

export default LanguageDropdown;
