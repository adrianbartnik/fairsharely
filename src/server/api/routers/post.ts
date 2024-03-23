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
    .input(z.object({}))
    .mutation(async ({ ctx }) => {
      console.log("Creating occasion");

      return ctx.db.occasion.create({
        data: {
          name: "bla",
          description: "bla",
          currency: "EURO",
          category: "bla",
          participants: {
            create: [
              {
                name: "Horst",
              },
              {
                name: "Dieter",
              },
            ],
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
