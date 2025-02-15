
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
      className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="font-semibold mb-4 text-sm text-gray-700">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMoveTask} />
        ))}
      </div>
    </div>
  );
}
