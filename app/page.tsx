import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <TodoList />
    </main>
  );
}
