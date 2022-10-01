import { toast } from "react-toastify";

export function copyToClipboard(url: string, message: string) {
  navigator.clipboard.writeText(url);
  toast.dark(message);
}
