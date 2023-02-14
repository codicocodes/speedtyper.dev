import ReactSwitch from "react-switch";
import { ActionButton } from "../modules/play2/components/play-footer/PlayFooter";
import {
  toggleSmoothCaret,
  useSettingsStore,
} from "../modules/play2/state/settings-store";

export default function SettingsPage() {
  const smoothCaret = useSettingsStore((state) => state.smoothCaret);
  return (
    <div
      className="flex justify-center items-center h-full"
      style={{
        fontFamily: "Fira Code",
      }}
    >
      <div className="gap-4 bg-off-white text-dark-ocean p-4 rounded">
        <h2 className="flex justify-center font-semibold text-3xl my-4">
          Settings
        </h2>
        <div className="flex my-4">
          <ActionButton
            onClick={toggleSmoothCaret}
            icon={
              <ReactSwitch onChange={() => {}} checked={smoothCaret ?? false} />
            }
            text="smooth caret"
          />
        </div>
      </div>
    </div>
  );
}
