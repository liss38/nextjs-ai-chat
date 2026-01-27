"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <Button
      className={cn("gap-2", className)}
      {...props}
    >
      <MessageCircle />
      {children || label}
    </Button>
  )
}

export { ChatButton }
