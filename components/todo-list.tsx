"use client";

import { useState } from "react";
import { ListTodo, Sparkles } from "lucide-react";
import type { Todo, FilterType } from "@/types/todo";
import { TodoItem } from "./todo-item";
import { TodoInput } from "./todo-input";
import { TodoFilter } from "./todo-filter";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "./footer";

export function TodoList() {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Aprender React e Next.js", completed: true, createdAt: new Date() },
    { id: "2", title: "Criar uma aplicação incrível", completed: false, createdAt: new Date() },
    { id: "3", title: "Organizar minhas tarefas", completed: false, createdAt: new Date() },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (title: string) => {
    const isDuplicate = todos.some(
      (todo) => todo.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
      toast({
        variant: "destructive",
        title: "Tarefa duplicada",
        description: "Já existe uma tarefa com esse nome.",
      });
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    toast({
      variant: "success",
      title: "Tarefa criada",
      description: `"${title}" foi adicionada com sucesso.`,
    });
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    if (todo) {
      toast({
        variant: todo.completed ? "warning" : "success",
        title: todo.completed ? "Tarefa reaberta" : "Tarefa concluida",
        description: `"${todo.title}" foi ${todo.completed ? "marcada como pendente" : "marcada como concluida"}.`,
      });
    }
  };

  const deleteTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    setTodos(todos.filter((t) => t.id !== id));
    if (todo) {
      toast({
        variant: "destructive",
        title: "Tarefa excluida",
        description: `"${todo.title}" foi removida da lista.`,
      });
    }
  };

  const clearCompleted = () => {
    const completedCount = todos.filter((t) => t.completed).length;
    setTodos(todos.filter((t) => !t.completed));
    toast({
      variant: "info",
      title: "Tarefas limpas",
      description: `${completedCount} tarefa${completedCount > 1 ? "s" : ""} concluida${completedCount > 1 ? "s" : ""} removida${completedCount > 1 ? "s" : ""}.`,
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Header */}
      <div className="relative text-center">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Organize seu dia</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          TaskFlow
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie suas tarefas de forma simples e eficiente
        </p>
      </div>

      {/* Input */}
      <TodoInput onAdd={addTodo} />

      {/* Filter */}
      <TodoFilter filter={filter} onFilterChange={setFilter} counts={counts} />

      {/* List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 py-12">
            <ListTodo className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              {filter === "all"
                ? "Nenhuma tarefa adicionada"
                : filter === "active"
                  ? "Nenhuma tarefa pendente"
                  : "Nenhuma tarefa concluída"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Footer Stats */}
      {todos.length > 0 && (
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <span>
            {counts.completed} de {counts.all} tarefas concluídas
          </span>
          {counts.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="text-destructive transition-colors hover:text-destructive/80"
            >
              Limpar concluidas
            </button>
          )}
        </div>
      )}

      <Footer />

    </div>
  );
}
