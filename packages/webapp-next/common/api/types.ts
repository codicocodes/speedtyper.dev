import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export type ServerSideContext = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;
