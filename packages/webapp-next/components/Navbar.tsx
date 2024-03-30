import Image from "next/image";
import { useIsPlaying } from "../common/hooks/useIsPlaying";

export const WebsiteName = () => {
  const isPlaying = useIsPlaying();
  const websiteName = "speedtyper.dev";
  const colorClass = isPlaying ? "text-faded-gray" : "text-inherit";
  return (
    <h2
      className={`hidden sm:block whitespace-no-wrap font-bold ${colorClass}`}
    >
      {websiteName}
    </h2>
  );
};

export const Logo = () => {
  const isPlaying = useIsPlaying();
  return isPlaying ? (
    <Image
      width="45px"
      height="25px"
      src="/faded-logo.png"
      quality={100}
      alt="speedtyper logo"
    />
  ) : (
    <Image
      width="45px"
      height="25px"
      src="/logo.png"
      quality={100}
      alt="speedtyper logo"
    />
  );
};
