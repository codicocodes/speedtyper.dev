import Router from "next/router";

export const addIDtoQueryParams = (id: string) => {
  Router.push(
    {
      pathname: "/play2",
      query: { id },
    },
    undefined,
    { shallow: true }
  );
};
