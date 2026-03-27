import { createContext, ReactNode, useContext, useState } from "react";
import { Task } from "../types/Task";

interface TasksContextProps {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Estudiar Ionic",
      description: "Repasar rutas y componentes",
      completed: false,
    },
    {
      id: "2",
      title: "Hacer Challenge 05",
      description: "Agregar Firebase, contexts y hooks",
      completed: false,
    },
  ]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, toggleTask, deleteTask, getTaskById }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext debe usarse dentro de TasksProvider");
  }

  return context;
}