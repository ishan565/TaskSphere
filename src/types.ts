
export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "todo" | "in-progress" | "done";
}
