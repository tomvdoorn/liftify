import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { trainerId, traineeId, templateId } = req.body;

  try {
    const assignment = await prisma.assignedTemplate.create({
      data: {
        trainerId,
        traineeId,
        templateId,
      },
    });
    res.status(200).json(assignment);
  } catch (error) {
    if (typeof error === 'string') {
        // Now TypeScript knows that `error` is a string, so you can perform string operations on it
        console.error(error.toUpperCase());
      } else if (error instanceof Error) {
        // Now TypeScript knows that `error` is an Error object, so you can access its `message` property
        res.status(500).json({ error: error.message });
      }
    
  }
}
