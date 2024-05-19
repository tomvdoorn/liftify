import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const exercises = await prisma.exercise.findMany();
    res.status(200).json(exercises);
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    const exercise = await prisma.exercise.create({
      data: { name, description },
    });
    res.status(201).json(exercise);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
