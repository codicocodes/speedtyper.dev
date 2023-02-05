import { useRouter } from "next/router";

export function useGameIdQueryParam(): string | undefined {
  var router = useRouter();
  var id = router.query["id"];
  return typeof id === "string" ? id : undefined;
}
