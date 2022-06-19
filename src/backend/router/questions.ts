import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";

export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestions.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return await prisma.pollQuestions.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(600),
      // options: z.string().array(),
    }),
    async resolve({ input }) {
      return await prisma.pollQuestions.create({
        data: {
          question: input.question,
          options: [],
        },
      });
    },
  });
