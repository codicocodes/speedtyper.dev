import Image from "next/image";
import { ProfileIcon } from "../../assets/icons";

interface AvatarProps {
  url?: string;
  username: string;
}

export const Avatar: React.FC<AvatarProps> = ({ url, username }) => {
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
        <ProfileIcon />
      )}
    </div>
  );
};
