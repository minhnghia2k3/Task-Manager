"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export interface ITasks {
  _id: string;
  author: string;
  title: string;
  image: string;
  description: string;
  priority: number;
  status: number;
}
export interface IPagination {
  currentPage: number;
  totalPage: number;
  unit: number;
}

export enum Priority {
  Low = 0,
  Normal = 1,
  Urgency = 2,
}

export enum Status {
  Cancel = 0,
  Pending = 1,
  Done = 2,
}

export default function Component() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  // Fetch all users task
  useEffect(() => {
    const fetchAllTasks = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/tasks?page=1&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.statusCode === 401) {
        router.push("/login");
      }
      if (result.statusCode === 403) {
        router.push("/banned");
      }

      setTasks(result.data);
      setPagination(result.info);

      return result;
    };
    fetchAllTasks();
  }, []);
  if (tasks && tasks.length > 0) {
    return (
      <div className="grid gap-4">
        <div className="grid gap-1">
          <h1 className="font-semibold text-xl">Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Here are your tasks for the day
          </p>
        </div>
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task, index) => (
            <Card
              key={index}
              id={task._id}
              className={clsx({
                "border-ring": task.priority === Priority.Normal,
                "border-destructive border-2":
                  task.priority === Priority.Urgency,
              })}
            >
              <CardContent className="p-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    <h2 className="font-semibold text-sm">{task.title}</h2>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div
                    className={clsx("flex gap-2 text-sm items-center", {
                      "text-gray-500 dark:text-gray-400":
                        task.priority === Priority.Low,
                      "text-ring dark:text-ring":
                        task.priority === Priority.Normal,
                      "text-destructive dark:text-destructive  font-semibold":
                        task.priority === Priority.Urgency,
                    })}
                  >
                    <KeyIcon className="h-4 w-4" />
                    <span>Priority:</span>
                    <span>{Priority[task.priority]}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }
  return <p>Loading...</p>;
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PencilIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
function KeyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function InfoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
