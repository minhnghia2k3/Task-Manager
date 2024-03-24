"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

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
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createTaskSchema = z.object({
  title: z.string().min(2),
  image: z.any().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
    message: "Only these types are allowed .jpg, .jpeg, .png and .webp",
  }),
  description: z.string().optional(),
  priority: z.number().optional(),
  status: z.number().optional(),
});

export function CreateTaskForm() {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 0,
      status: 1,
    },
  });
  async function onSubmit(data: z.infer<typeof createTaskSchema>) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("image", data.image);
    formData.append("priority", String(data.priority));
    formData.append("status", String(data.status));
    console.log("formData: ", formData);
    await fetch(`${process.env.NEXT_PUBLIC_SERVER}/tasks`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4 overflow-auto px-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Image of task"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Priority</FormLabel>
              <Select defaultValue={String(Priority.Low)}>
                <SelectTrigger id={`area`} aria-label="Area">
                  <SelectValue placeholder="Select task priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    onChange={() => {
                      form.setValue("priority", Priority.Low);
                    }}
                    value={String(Priority.Low)}
                  >
                    Low
                  </SelectItem>
                  <SelectItem
                    onChange={() => {
                      form.setValue("priority", Priority.Normal);
                    }}
                    value={String(Priority.Normal)}
                  >
                    Normal
                  </SelectItem>
                  <SelectItem
                    onChange={() => {
                      form.setValue("priority", Priority.Urgency);
                    }}
                    value={String(Priority.Urgency)}
                  >
                    Urgency
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Status</FormLabel>
              <Select defaultValue={String(Status.Pending)}>
                <SelectTrigger id={`area`} aria-label="Area">
                  <SelectValue placeholder="Select task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    onChange={() => {
                      form.setValue("status", Status.Cancel);
                    }}
                    value={String(Status.Cancel)}
                  >
                    Cancel
                  </SelectItem>
                  <SelectItem
                    onChange={() => {
                      form.setValue("status", Status.Pending);
                    }}
                    value={String(Status.Pending)}
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    onChange={() => {
                      form.setValue("status", Status.Done);
                    }}
                    value={String(Status.Done)}
                  >
                    Done
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create task</Button>
      </form>
    </Form>
  );
}
