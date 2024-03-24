import { Currency } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  filter: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.occasion.findMany({
        where: {
          name: input.name,
        },
      });
    }),

  createOccasion: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        currency: z.nativeEnum(Currency),
        category: z.string().min(1),
        participants: z.array(z.object({ name: z.string().min(1) })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.occasion.create({
        data: {
          name: input.name,
          description: input.description,
          currency: input.currency,
          category: input.category,
          participants: {
            create: input.participants,
          },
        },
      });
    }),

  createExpense: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        amount: z.number(),
        occasionId: z.number(),
        participantShares: z.array(
          z.object({ participantId: z.number(), amount: z.number() }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.expense.create({
        data: {
          title: input.title,
          amount: input.amount,
          occasionId: input.occasionId,
          participantShare: {
            create: input.participantShares,
          },
        },
      });
    }),

  getAll: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.occasion.findMany({});
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.occasion.findUnique({
        where: { id: input.id },
        include: {
          participants: true,
          expenses: {
            include: {
              participantShare: true,
            },
          },
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.occasion.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
