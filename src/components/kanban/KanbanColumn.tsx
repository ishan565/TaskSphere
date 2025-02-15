
import { Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  status: Task["status"];
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
}

export function KanbanColumn({ id, title, tasks, status, onMoveTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 rounded-lg p-4"
    >
      <h3 className="font-medium mb-4 text-sm text-gray-600">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMoveTask} />
        ))}
      </div>
    </div>
  );
}
