import { useRouter } from "next/router";

export function useGameIdQueryParam() {
  var router = useRouter();
  var id = router.query["id"];
  return typeof id === "string" ? id : undefined;
}
