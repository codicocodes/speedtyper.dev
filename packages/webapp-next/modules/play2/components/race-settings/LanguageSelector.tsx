import useSWR from "swr";
import { Listbox } from "@headlessui/react";
import { CrossIcon } from "../../../../assets/icons/CrossIcon";
import { getExperimentalServerUrl } from "../../../../common/utils/getServerUrl";
import { useSettingsStore } from "../../state/settings-store";
import { useGameStore } from "../../state/game-store";

const selectProgrammingLanguage = (languageSelected: string | null) => {
  useSettingsStore.setState((s) => ({ ...s, languageSelected }));
  if (languageSelected) {
    useGameStore.getState().game?.next();
  }
};

const baseUrl = getExperimentalServerUrl();

export function LanguageSelector() {
  const { data, isLoading } = useSWR(
    baseUrl + "/api/projects/languages",
    (...args) => fetch(...args).then((res) => res.json())
  );
  const languages = data as undefined | string[];
  const selectedLanguage = useSettingsStore((s) => s.languageSelected);
  return (
    <div className="w-full text-dark-ocean font-thin">
      <h2 className="text-xs mb-1 font-semibold uppercase tracking-widest">
        select language
      </h2>
      <Listbox value={selectedLanguage} onChange={selectProgrammingLanguage}>
        <div className="flex items-center">
          <Listbox.Button className="flex items-center justify-between px-2 bg-gray-200 p-1 w-full rounded">
            {selectedLanguage || "nothing selected"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Listbox.Button>
          {selectedLanguage && (
            <button
              onClick={() => selectProgrammingLanguage(null)}
              className="flex items-center p-1 h-full  bg-gray-200 mx-2 rounded"
            >
              <div className="w-2 text-red-500 fill-current mx-1">
                <CrossIcon />
              </div>
              <span>clear</span>
            </button>
          )}
        </div>
        {!isLoading && (
          <Listbox.Options className="">
            {languages?.map((language) => (
              <Listbox.Option key={language} value={language}>
                {({ active, selected }) => {
                  return (
                    <li
                      className={`pl-2 flex items-center gap-2 my-1 p-1 rounded cursor-pointer ${
                        active ? "bg-gray-300" : "bg-gray-200"
                      }`}
                    >
                      {language}
                      {selected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="h-5 w-auto text-green-500 fill-current"
                        >
                          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                      )}
                    </li>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
}
