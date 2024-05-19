import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { userId, templateId, date, workoutLogs } = req.body;

  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        templateId,
        date,
        workoutLogs: {
          create: workoutLogs.map((log: { exerciseId: number; sets: number; reps: number; weight: number; }) => ({
            exerciseId: log.exerciseId,
            sets: log.sets,
            reps: log.reps,
            weight: log.weight,
          })),
        },
      },
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
