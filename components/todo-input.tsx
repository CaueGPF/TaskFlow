"use client";

import React from "react"

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        <Plus className="h-5 w-5" />
        <span className="sr-only">Adicionar tarefa</span>
      </Button>
    </form>
  );
}
