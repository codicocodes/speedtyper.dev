import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      settings: null,
    },
  };
};

export default function SettingsPage({
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div className="h-full bg-off-white">settings</div>;
}
