"use client";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";
import { RxChatBubble } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

interface Message {
  role: "user" | "assistant" | "data" | "system"; // Thêm giá trị từ thư viện
  content: string;
}

export default function Chat() {
  const [isChatOpen, setIschatOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedChatState = sessionStorage.getItem("isChatOpen");
      return savedChatState ? JSON.parse(savedChatState) : false;
    }
    return false;
  });
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const [storedMessages, setStoredMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatHistory");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
  });
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
  } = useChat({ api: "/api/openai" });

  useEffect(() => {
    if (messages.length > 0) {
      setStoredMessages(messages);
    }
  }, [messages]);
  useEffect(() => {
    //luu trang thai tin nhan
    localStorage.setItem("chatHistory", JSON.stringify(storedMessages));
  }, [storedMessages]);

  useEffect(() => {
    const savedChatState = sessionStorage.getItem("isChatOpen");
    if (savedChatState !== null) {
      setIschatOpen(JSON.parse(savedChatState)); // Chỉ cập nhật nếu có giá trị
    }
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    sessionStorage.setItem("isChatOpen", JSON.stringify(isChatOpen));
  }, [isChatOpen]);

  const scrollRef = useRef<HTMLDivElement>(null);
  // console.log((messages));
  // useEffect(() => {
  //   console.log("input: ",input)
  //   console.log("messages: ",messages)
  //   console.log("error: ",error)
  // }, [messages,error,input]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable prefer-const */

  const toggleChat = () => {
    setIschatOpen((prev) => {
      const newState = !prev;
      sessionStorage.setItem("isChatOpen", JSON.stringify(newState)); // Cập nhật ngay khi toggle
      return newState;
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);
  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="rounded-full size-14 p-2 shadow-lg"
            >
              {!isChatOpen ? (
                <MessageCircle className="szie-12" />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold">
                  Hỗ trợ với Đắp Việt AI
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="px-2 py-0"
                >
                  <X className="size-4" />
                  <span className="sr-only"> Đóng chat</span>
                </Button>
              </CardHeader>
              {/* Nội dung chat */}
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {/* Hiển thị khi không có tin nhắn */}
                  {storedMessages.length === 0 && (
                    <div className="flex flex-col">
                      <div className="w-full mt-32 text-gray-800 items-center justify-center flex gap-3">
                        <RxChatBubble className="h-5 w-5 text-blue-500" />
                        <h6>Hãy hỏi Đắp Việt AI để nhận hỗ trợ!</h6>
                      </div>
                      <span className="text-gray-500 text-sm flex justify-center ml-4">
                        Cuộc trò chuyện không được lưu trữ
                      </span>
                    </div>
                  )}

                  {/* Hiển thị danh sách tin nhắn */}
                  {storedMessages.map((message: Message, index: number) => (
                    <div
                      key={index}
                      className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`inline-block p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <ReactMarkdown // eslint-disable-next-line react/no-children-prop
                          children={message.content}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              inline, // inline được ép kiểu là boolean nếu không chắc chắn
                              className,
                              children,
                              ...props
                            }: any) {
                              return inline ? (
                                <code
                                  {...props}
                                  className="bg-gray-200 px-1 rounded"
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...props}
                                  className="bg-gray-200 p-2 rounded"
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="list-disc ml-4">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-4">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="ml-4">{children}</li>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Hiển thị loading khi đang tải */}
                  {isLoading && (
                    <div className="w-full items-center flex justify-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-primary" />
                      <button
                        className="underline"
                        type="button"
                        onClick={stop}
                      >
                        Dừng
                      </button>
                    </div>
                  )}

                  {/* Hiển thị lỗi nếu có */}
                  {error && (
                    <div className="w-full items-center flex justify-center gap-3">
                      <div>Có lỗi xảy ra!</div>
                      <button
                        className="underline"
                        type="button"
                        onClick={() => reload()}
                      >
                        Thử lại
                      </button>
                    </div>
                  )}

                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder="Nhập câu hỏi của bạn tại đây..."
                  />
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
