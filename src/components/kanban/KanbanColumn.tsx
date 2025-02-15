
import { Task } from "@/types";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: Task["status"];
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
}

export function KanbanColumn({ title, tasks, status, onMoveTask }: KanbanColumnProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium mb-4 text-sm text-gray-600">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMoveTask} />
        ))}
      </div>
    </div>
  );
}
