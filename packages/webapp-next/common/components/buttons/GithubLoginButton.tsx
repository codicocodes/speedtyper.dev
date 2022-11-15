import { GithubLogo } from "../../../assets/icons";
import Button from "../Button";

interface GithubLoginButtonProps {
  showModal: () => void;
}

export const GithubLoginButton = ({ showModal }: GithubLoginButtonProps) => {
  return (
    <div className="hidden sm:block">
      <Button
        color="primary"
        size="sm"
        leftIcon={<GithubLogo />}
        onClick={showModal}
        title="Login"
        text="Sign up | Login"
      />
    </div>
  );
};
