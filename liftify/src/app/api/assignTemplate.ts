import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
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
    res.status(500).json({ error: error.message });
  }
}
