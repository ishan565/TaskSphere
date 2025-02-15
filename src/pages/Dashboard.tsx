
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <KanbanBoard />
      </main>
    </div>
  );
}
