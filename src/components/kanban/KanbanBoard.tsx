
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanColumn } from "./KanbanColumn";
import { TaskDialog } from "./TaskDialog";
import { Task } from "@/types";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new features",
    status: "todo",
    deadline: "2024-03-20",
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Review and merge team pull requests",
    status: "in-progress",
    deadline: "2024-03-15",
  },
  {
    id: "3",
    title: "Deploy to production",
    description: "Deploy the latest changes to production",
    status: "done",
    deadline: "2024-03-10",
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTask = (task: Omit<Task, "id" | "status">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: "todo",
    };
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleMoveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="p-4 h-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        <KanbanColumn
          title="To Do"
          tasks={tasks.filter(t => t.status === "todo")}
          status="todo"
          onMoveTask={handleMoveTask}
        />
        <KanbanColumn
          title="In Progress"
          tasks={tasks.filter(t => t.status === "in-progress")}
          status="in-progress"
          onMoveTask={handleMoveTask}
        />
        <KanbanColumn
          title="Done"
          tasks={tasks.filter(t => t.status === "done")}
          status="done"
          onMoveTask={handleMoveTask}
        />
      </div>
      <TaskDialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
