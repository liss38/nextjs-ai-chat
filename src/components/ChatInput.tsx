"use client"

import React, { ChangeEvent, FormEvent } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChatRequestOptions } from "ai"
import { SendIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, { message: "Введите сообщение" }),
})


type FormValues = z.infer<typeof formSchema>

interface ChatInputProps {
  input: string;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
    mode: "onSubmit",
  })

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className={cn("flex items-center gap-2", "w-full")}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Введите сообщение…"
                  className="focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="icon">
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  )
}

export default ChatInput
