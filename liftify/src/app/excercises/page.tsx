'use client';

import { useState } from 'react';
import { Button, Input, Modal } from '@shadcn/ui';
import { trpc } from '../../lib/trpc';

export default function Exercises() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: exercises, refetch } = trpc.exercise.getAll.useQuery();
  const createExercise = trpc.exercise.create.useMutation({
    onSuccess: () => refetch(),
  });

  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExercise = () => {
    createExercise.mutate({
      name: exerciseName,
      description,
    });
    setIsModalOpen(false);
    setExerciseName('');
    setDescription('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Exercises</h1>
      <p className="mt-4">Manage your exercises here.</p>
      <Button onClick={() => setIsModalOpen(true)}>Add Exercise</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold">Add Exercise</h2>
          <Input
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="mt-2"
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2"
          />
          <Button className="mt-4" onClick={handleAddExercise}>
            Save
          </Button>
        </div>
      </Modal>
      <ul className="mt-4">
        {exercises?.map((exercise) => (
          <li key={exercise.id} className="border-b py-2">
            {exercise.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
