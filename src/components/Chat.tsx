"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import ChatInput from "./ChatInput"
import { cn } from "@/lib/utils"

const Chat = () => {

  const [input, setInput] = useState("")

  const { messages, sendMessage, } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({
      role: 'user' as const,
      parts: [{ type: 'text' as const, text: input }],
    });
    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex-1 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <span
              className={cn(
                "py-2 px-4 rounded-lg",
                message.role === "user"
                  ? "bg-secondary text-primary rounded-tr-none"
                  : "bg-primary text-secondary rounded-tl-none"
              )}
            >
              {message.parts.find((part): part is { type: 'text'; text: string } => part.type === 'text')?.text ?? ''}
            </span>
          </div>
        ))}
      </div>
      <ChatInput {...{
        input,
        handleInputChange,
        handleSubmit,
      }} />
    </div>
  )
}

export default Chat
