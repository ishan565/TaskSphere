
import { Calendar, MoreVertical } from "lucide-react";
import { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: Task["status"]) => void;
}

export function TaskCard({ task, onMove }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 
        transition-all duration-200 hover:shadow-md group cursor-grab 
        active:cursor-grabbing ${isDragging ? "opacity-50" : ""}
        hover:border-blue-100`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{task.title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4 text-gray-500 hover:text-gray-700" />
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
