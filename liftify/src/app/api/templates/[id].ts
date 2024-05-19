import { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const template = await prisma.template.findUnique({
      where: { id: Number(id) },
      include: { templateExercises: true },
    });
    res.status(200).json(template);
  } else if (req.method === 'PUT') {
    const { name, exercises } = req.body;
    const template = await prisma.template.update({
      where: { id: Number(id) },
      data: {
        name,
        templateExercises: {
          deleteMany: {},
          create: exercises.map((exerciseId: number, index: number) => ({
            exerciseId,
            order: index,
          })),
        },
      },
    });
    res.status(200).json(template);
  } else if (req.method === 'DELETE') {
    await prisma.template.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
