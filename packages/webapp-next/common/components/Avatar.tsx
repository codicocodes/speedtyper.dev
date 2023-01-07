import Image from "next/image";
import { ProfileIcon } from "../../assets/icons";

interface AvatarProps {
  avatarUrl?: string;
  username: string;
}

export const Avatar: React.FC<AvatarProps> = ({ avatarUrl, username }) => {
  return (
    <div className="flex items-center cursor-pointer font-semibold text-sm gap-2">
      {username}
      {avatarUrl ? (
        <Image
          className="cursor-pointer rounded-full"
          width="30"
          height="30"
          quality={100}
          src={avatarUrl}
          alt={username}
        />
      ) : (
        <ProfileIcon />
      )}
    </div>
  );
};
