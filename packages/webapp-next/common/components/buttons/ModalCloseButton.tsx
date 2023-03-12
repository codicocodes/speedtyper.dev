interface ModalButtonCloseProps {
  onButtonClickHandler: () => void;
}

export default function ModalCloseButton({
  onButtonClickHandler,
}: ModalButtonCloseProps) {
  return (
    <button
      className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
      onClick={onButtonClickHandler}
    >
      <span className="bg-gray-300 rounded transition ease-in-out delay-100 hover:bg-gray-400 hover:text-gray-700 text-dark-ocean h-8 w-8 text-2xl block outline-none focus:outline-none">
        ×
      </span>
    </button>
  );
}
