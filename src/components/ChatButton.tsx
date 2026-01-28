"use client"

import * as React from "react"
import { MessageCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Chat from "@/components/Chat"

interface ChatButtonProps extends React.ComponentProps<typeof Button> {
  label?: string
}

function ChatButton({ 
  className, 
  label = "Start Chat",
  children,
  ...props 
}: ChatButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "gap-2 shadow-lg hover:shadow-xl transition-all duration-200",
            className
          )}
          size="lg"
          {...props}
        >
          <MessageCircleIcon className="size-5" />
          <span className="font-medium">{children || label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>AI Chat</DialogTitle>
          <DialogDescription>
            Start a conversation with AI assistant
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <Chat className="h-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ChatButton }
