import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

export default function Home(props: any) {
  const { data, isLoading } = trpc.useQuery(["getAllQuestions"]);

  if (isLoading || !data) return <div>Loading ....</div>;

  return <div>{data[0].question}</div>;
}

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestions.findMany();
  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
