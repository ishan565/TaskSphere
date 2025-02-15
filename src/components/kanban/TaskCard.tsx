
import { Calendar, MoreVertical } from "lucide-react";
import { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: Task["status"]) => void;
}

export function TaskCard({ task, onMove }: TaskCardProps) {
  return (
    <div className="task-card group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{task.title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {task.status !== "todo" && (
              <DropdownMenuItem onClick={() => onMove(task.id, "todo")}>
                Move to Todo
              </DropdownMenuItem>
            )}
            {task.status !== "in-progress" && (
              <DropdownMenuItem onClick={() => onMove(task.id, "in-progress")}>
                Move to In Progress
              </DropdownMenuItem>
            )}
            {task.status !== "done" && (
              <DropdownMenuItem onClick={() => onMove(task.id, "done")}>
                Move to Done
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{format(new Date(task.deadline), "MMM d, yyyy")}</span>
      </div>
    </div>
  );
}
