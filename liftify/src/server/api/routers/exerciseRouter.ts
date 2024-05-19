import { z } from 'zod';
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import prisma from '~/lib/prisma'; // Import the singleton instance

export const exerciseRouter = createTRPCRouter({
  // Create a new exercise
  createExercise: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.exercise.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Retrieve all exercises
  getAllExercises: protectedProcedure
    .query(async () => {
      return await prisma.exercise.findMany();
    }),

  // Retrieve a single exercise by ID
  getExerciseById: protectedProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await prisma.exercise.findUnique({
        where: { id: input },
      });
    }),

  // Update an existing exercise
  updateExercise: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.exercise.update({
        where: { id: input.id },
        data: {
          name: input.name ?? undefined,  // Preserve existing value if not updated
          description: input.description ?? undefined,  // Preserve existing value if not updated
        },
      });
    }),

  // Delete an exercise
  deleteExercise: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await prisma.exercise.delete({
        where: { id: input },
      });
    }),
});
