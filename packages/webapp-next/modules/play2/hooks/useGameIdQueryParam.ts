import { useRouter } from "next/router";

export function useInitialRaceIdQueryParam(): string | undefined {
  var router = useRouter();
  var id = router.query["id"];
  return typeof id === "string" ? id : undefined;
}
