import React, { useEffect, useRef } from "react";

// @ts-ignore
import { highlightBlock } from "highlight.js/lib";
import "highlight.js/styles/atom-one-dark.css"; // import your preferred style
import explode from "../utils/explode/";
import SmoothCaret from "./SmoothCaret";
import { useAppContext } from "../AppContext";

const buildWrongChars = (chars: string) => {
  const replaced = chars
    .replace(/\n/g, "↵\n")
    .replace(/[ ]{2,}/g, (match) => {
      let replacement = "";

      match.split("").forEach(() => {
        replacement += "__SPEEDTYPER__TEMPORARY_INDENTATION__";
      });
      return replacement;
    })
    .replace(/[^\S\r\n]/g, "❚")
    .replace(/__SPEEDTYPER__TEMPORARY_INDENTATION__/g, " ");

  return replaced;
};

export default ({
  skippedMessage,
  correctChars,
  wrongChars,
  indentation,
  nextChar,
  untypedChars,
  codeInputRef,
  inputIsSelected,
  powerMode,
  language,
}: {
  skippedMessage: string;
  correctChars: string;
  wrongChars: string;
  indentation: string;
  nextChar: string;
  untypedChars: string;
  codeInputRef: React.MutableRefObject<any>;
  inputIsSelected: boolean;
  powerMode: boolean;
  blockTyping: boolean;
  language: string | undefined;
}) => {
  const { smoothCaret } = useAppContext();

  const nextCharRef = useRef(null);

  useEffect(() => {
    if (powerMode && nextChar && correctChars && !wrongChars) {
      const rect = nextCharRef?.current?.getBoundingClientRect() ?? {};
      const { x, y } = rect;
      if (x && y) {
        explode(x, y);
      }
    }
  }, [nextChar, wrongChars, correctChars, powerMode]);

  const correctRef = useRef(null);

  useEffect(() => {
    if (correctRef && correctChars) {
      highlightBlock(correctRef.current);
    }
  }, [correctChars]);

  return (
    <div
      className="flex items-center justify-center w-full"
      onClick={() => {
        codeInputRef.current.focus({
          preventScroll: true,
        });
      }}
    >
      <div className="flex w-full relative rounded mb-0">
        {smoothCaret && (
          <SmoothCaret
            nextCharRef={nextCharRef}
            inputIsSelected={inputIsSelected}
          />
        )}

        <div className="flex-col w-full text-off-white">
          <pre
            id="code-container"
            className={`tracking-wider font-thin overflow-auto p-4 ${
              language?.toLowerCase() ?? ""
            }`}
            style={{
              fontSize: "18px",
              margin: 0,
              whiteSpace: "break-spaces",
            }}
          >
            <br />
            <span
              style={{
                wordBreak: "break-all",
                color: "#B8B8B8",
              }}
            >
              {skippedMessage}
            </span>
            {correctChars && (
              <span
                ref={correctRef}
                style={{
                  wordBreak: "break-all",
                  background: "none",
                  display: "inline",
                  padding: "0",
                }}
              >
                {correctChars}
              </span>
            )}

            {wrongChars && (
              <span
                style={{
                  wordBreak: "break-all",
                  color: "red",
                }}
              >
                {buildWrongChars(wrongChars)}
              </span>
            )}

            {indentation && (
              <span
                style={{
                  wordBreak: "break-all",
                  color: "yellow",
                }}
              >
                {indentation}
              </span>
            )}

            {nextChar && (
              <span
                className={
                  smoothCaret || !inputIsSelected
                    ? ""
                    : "text-dark-ocean bg-purple-400"
                }
                ref={nextCharRef}
              >
                {nextChar.replace(/\n/g, "↵\n")}
              </span>
            )}

            {untypedChars && (
              <span
                style={{
                  wordBreak: "break-all",
                  background: "none",
                  padding: "0",
                  display: "inline",
                }}
              >
                {untypedChars}
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};
