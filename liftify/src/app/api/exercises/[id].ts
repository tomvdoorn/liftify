import { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const exercise = await prisma.exercise.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(exercise);
  } else if (req.method === 'PUT') {
    const { name, description } = req.body;
    const exercise = await prisma.exercise.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    res.status(200).json(exercise);
  } else if (req.method === 'DELETE') {
    await prisma.exercise.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
