import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";
import React from "react";
import Link from "next/link";

const QuestionCreator = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });
  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
          event.currentTarget.value = "";
        }
      }}
    ></input>
  );
};

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading ....</div>;

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data.map((question) => {
          return (
            <Link key={question.id} href={`/question/${question.id}`}>
              <a>
                <div className="my-2">{question.question}</div>
              </a>
            </Link>
          );
        })}
      </div>
      <QuestionCreator />
    </div>
  );
}
