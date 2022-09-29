interface HiddenCodeInputProps {
  hide: boolean; // Used for debugging the input
  disabled: boolean;
  inputRef: (node: HTMLInputElement) => void;
  handleOnKeyUp: (key: string) => void;
}

export const HiddenCodeInput = ({
  disabled,
  hide,
  inputRef,
  handleOnKeyUp,
}: HiddenCodeInputProps) => {
  return (
    <input
      ref={inputRef}
      autoFocus
      disabled={disabled}
      onKeyDown={(e) => {
        e.preventDefault();
        const { key } = e;
        handleOnKeyUp(key);
      }}
      onChange={(e) => {
        e.preventDefault();
      }}
      style={{
        ...(hide
          ? {
              position: "absolute",
              width: "1px",
              left: "-10000000px",
            }
          : {}),
      }}
    />
  );
};
