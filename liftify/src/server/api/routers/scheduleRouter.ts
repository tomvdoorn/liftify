import { z } from 'zod';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";
  import prisma from "~/lib/prisma"; // Import the singleton instance

export const scheduleRouter = createTRPCRouter({
  createSchedule: protectedProcedure
    .input(z.object({
      date: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Ensure the user is logged in
      const userId = ctx.session.user.id;

      // Check if the schedule already exists for the given date
      const existingSchedule = await prisma.schedule.findUnique({
        where: {
          userId_date: {
            userId,
            date: input.date,
          },
        },
      });

      // If the schedule exists, return it
      if (existingSchedule) {
        return existingSchedule;
      }

      // Otherwise, create a new schedule
      return await prisma.schedule.create({
        data: {
          userId,
          date: input.date,
        },
      });
    }),

  addWorkoutToSchedule: protectedProcedure
    .input(z.object({
      scheduleId: z.number(),
      templateId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { scheduleId, templateId } = input;

      // Add a workout to the schedule
      return await prisma.scheduledWorkout.create({
        data: {
          scheduleId,
          templateId,
        },
      });
    }),

  getScheduleForDate: protectedProcedure
    .input(z.object({
      date: z.date(),
    }))
    .query(async ({ ctx, input }) => {
      // Fetch the schedule for a specific date
      return await prisma.schedule.findFirst({
        where: {
          userId: ctx.session.user.id,
          date: input.date,
        },
        include: {
          scheduledWorkouts: {
            include: {
              template: true,  // assuming a relationship to a 'Template' model
            },
          },
        },
      });
    }),
});
