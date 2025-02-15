
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto">
        <KanbanBoard />
      </main>
    </div>
  );
}
