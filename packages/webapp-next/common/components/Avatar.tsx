import Image from "next/image";

interface AvatarProps {
  url?: string;
  username: string;
}

export const Avatar: React.FC<AvatarProps> = ({ url, username }) => {
  const initial = username[0];
  return (
    <div className="flex items-center cursor-pointer font-semibold text-sm gap-2">
      {username}
      {url ? (
        <Image
          className="w-8 h-8 cursor-pointer rounded-full"
          quality={100}
          src={url}
          alt={username}
        />
      ) : (
        <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-400 text-white uppercase">
          {initial}
        </div>
      )}
    </div>
  );
};
