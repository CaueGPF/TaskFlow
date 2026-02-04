"use client";

import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/50",
        todo.completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
          todo.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        )}
        aria-label={todo.completed ? "Marcar como pendente" : "Marcar como concluída"}
      >
        {todo.completed && <Check className="h-4 w-4" />}
      </button>

      <span
        className={cn(
          "flex-1 text-foreground transition-all duration-200",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-muted-foreground opacity-0 transition-all duration-200 hover:text-destructive group-hover:opacity-100"
        aria-label="Excluir tarefa"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
