import ReactSwitch from "react-switch";
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
          <p className="pr-4">Smooth Caret</p>
          <ReactSwitch
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() => {
              toggleSmoothCaret();
            }}
            checked={smoothCaret ?? false}
          />
        </div>
      </div>
    </div>
  );
}
