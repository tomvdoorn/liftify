'use client';
import { useState } from 'react';
import { Button} from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog } from '../../components/ui/dialog';
// import { api } from "~/trpc/server";

export default function Exercises() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { data: exercises, refetch } = api.exercise.getAll.useQuery();
//   const createExercise = api.exercise.create.useMutation({
//     onSuccess: () => refetch(),
//   });
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');

//   const handleAddExercise = () => {
//     createExercise.mutate({
//       name: exerciseName,
//       description,
//     });
//     setIsDialogOpen(false);
//     setExerciseName('');
//     setDescription('');
//   };

  return (
    <div>
      <h1 className="text-2xl font-bold">Exercises</h1>
      <p className="mt-4">Manage your exercises here.</p>
      <Button onClick={() => setIsDialogOpen(true)}>Add Exercise</Button>
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
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
           <Button className="mt-4">
            Save
          </Button>
          {/* <Button className="mt-4" onClick={handleAddExercise}>
            Save
          </Button> */}
        </div>
      </Dialog>

    {/* <ul className="mt-4">
        {exercises?.map((exercise) => (
            <li key={exercise.id} className="border-b py-2">
                {exercise.name}
            </li>
        ))}
    </ul> */}
    </div>
  );
}
