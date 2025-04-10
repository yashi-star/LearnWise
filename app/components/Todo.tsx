"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}

export default function renderTodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      createdAt: new Date(),
      priority: priority,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Task Manager</CardTitle>
          <Badge variant="outline" className="font-normal">
            {todos.filter(t => !t.completed).length} remaining
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
            onKeyDown={e => e.key === "Enter" && addTodo()}
          />
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className={`${getPriorityColor("low")} ${
                priority === "low" ? "border-green-500" : ""
              }`}
              onClick={() => setPriority("low")}
              title="Low priority"
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`${getPriorityColor("medium")} ${
                priority === "medium" ? "border-amber-500" : ""
              }`}
              onClick={() => setPriority("medium")}
              title="Medium priority"
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`${getPriorityColor("high")} ${
                priority === "high" ? "border-red-500" : ""
              }`}
              onClick={() => setPriority("high")}
              title="High priority"
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilter("active")}>
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              onClick={() => setFilter("completed")}
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {renderTodoList(filteredTodos)}
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            {renderTodoList(filteredTodos)}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {renderTodoList(filteredTodos)}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTodos([])}
          className="text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          Clear All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCompleted}
          disabled={!todos.some(t => t.completed)}
        >
          Clear Completed
        </Button>
      </CardFooter>

      {/* Helper function to render todo list */}
      {function renderTodoList(todos: Todo[]) {
        return (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {todos.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {filter === "all"
                  ? "No tasks yet. Add one above!"
                  : filter === "active"
                  ? "No active tasks!"
                  : "No completed tasks!"}
              </div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-3 border rounded-md bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full overflow-hidden">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <div className="flex flex-col w-full overflow-hidden">
                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        } font-medium truncate`}
                      >
                        {todo.text}
                      </label>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <AlertCircle
                          className={`h-3 w-3 mr-1 ${getPriorityColor(
                            todo.priority
                          )}`}
                        />
                        <span className="mr-2">{todo.priority}</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(todo.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        );
      }}
    </Card>
  );
}
