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
      console.log("Creating occasion");

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

  getAll: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.occasion.findMany({});
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.occasion.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
