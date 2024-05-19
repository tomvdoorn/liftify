import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { userId, date, templateId } = req.body;

  try {
    let schedule = await prisma.schedule.findUnique({
      where: { userId_date: { userId, date } },
    });

    if (!schedule) {
      schedule = await prisma.schedule.create({
        data: { userId, date },
      });
    }

    const scheduledWorkout = await prisma.scheduledWorkout.create({
      data: {
        scheduleId: schedule.id,
        templateId,
      },
    });

    res.status(200).json(scheduledWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
