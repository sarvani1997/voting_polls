import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading ....</div>;

  return <div>{data[0].question}</div>;
}
