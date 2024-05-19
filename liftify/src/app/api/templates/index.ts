import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const templates = await prisma.template.findMany({
      where: { userId: session.user.id },
    });
    res.status(200).json(templates);
  } else if (req.method === 'POST') {
    const { name, exercises } = req.body;
    const template = await prisma.template.create({
      data: {
        name,
        userId: session.user.id,
        templateExercises: {
          create: exercises.map((exerciseId: number, index: number) => ({
            exerciseId,
            order: index,
          })),
        },
      },
    });
    res.status(201).json(template);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
