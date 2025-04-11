"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Mic } from "lucide-react";
import { vapi } from "@/lib/vapi.sdk";
import { cn } from "@/lib/utils";
// import { useRecommendationStore } from "@/lib/store/recommendationStore";
// import { cookies } from "next/headers";
import { getRecommendedCourseId } from "../server-actions/getRecommendedCourseId";

interface VAPIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  PROCESSING = "PROCESSING",
  FINISHED = "FINISHED",
}

interface Message {
  role: "user" | "system" | "assistant";
  content: string;
  transcriptType?: string;
  type?: string;
  transcript?: string;
}

interface ConversationData {
  courseDescription?: string;
  mentorDescription?: string;
  professionalStatus?: string;
}

const VAPIModal = ({ isOpen, onClose }: VAPIModalProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [processingStatus, setProcessingStatus] = useState("");
  //   const { setRecommendedCourseId } = useRecommendationStore();

  // Use a ref to store conversation data to avoid dependency cycles
  const conversationDataRef = useRef<ConversationData>({});

  // Extract learning preferences from conversation
  useEffect(() => {
    if (messages.length < 3) return;

    // Extract user messages
    const userMessages = messages
      .filter(msg => msg.role === "user")
      .map(msg => msg.content)
      .join(" ");

    // Extract course description
    if (userMessages.includes("learn") || userMessages.includes("study")) {
      const learnMatch =
        userMessages.match(/learn\s+([^.,!?]+)/i) ||
        userMessages.match(/study\s+([^.,!?]+)/i) ||
        userMessages.match(/interested\s+in\s+([^.,!?]+)/i);

      if (learnMatch && learnMatch[1]) {
        conversationDataRef.current.courseDescription = learnMatch[1].trim();
      }
    }

    // Extract mentor preferences
    if (userMessages.includes("mentor") || userMessages.includes("teacher")) {
      const mentorMatch =
        userMessages.match(/mentor\s+([^.,!?]+)/i) ||
        userMessages.match(/teacher\s+([^.,!?]+)/i);

      if (mentorMatch && mentorMatch[1]) {
        conversationDataRef.current.mentorDescription = mentorMatch[1].trim();
      }
    }

    // Extract professional status
    const statusKeywords = [
      "student",
      "professional",
      "beginner",
      "intermediate",
      "advanced",
      "working",
      "job",
    ];
    for (const keyword of statusKeywords) {
      if (userMessages.toLowerCase().includes(keyword)) {
        const statusMatch = userMessages.match(
          new RegExp(`(I am|I'm)\\s+[\\w\\s]*(${keyword}[^.,!?]*)`, "i")
        );
        if (statusMatch && statusMatch[2]) {
          conversationDataRef.current.professionalStatus =
            statusMatch[2].trim();
          break;
        }
      }
    }
  }, [messages]);

  // Handle VAPI events - separated from state reset
  useEffect(() => {
    if (!isOpen) return;

    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = async () => {
      setCallStatus(CallStatus.PROCESSING);
      setProcessingStatus("Finding the perfect course for you...");

      // If no course description was extracted, use a default
      // if (!conversationDataRef.current.courseDescription) {
      //   conversationDataRef.current.courseDescription =
      //     "programming or technology skills";
      // }

      // Instead of making API call, we check the store
      // We just log the conversation data for debugging purposes
      //   console.log("Conversation data:", conversationDataRef.current);

      // Check if we already have a recommended course ID in the store
      // This would be set externally by the API you mentioned
      // const cookieStore = await cookies();
      const res = await fetch("/api/vapi/generate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data, "API response data");

      // Extract the course ID correctly from the response
      const courseId = data.data?.value || null;
      console.log(courseId, "extracted courseId");

      setProcessingStatus(
        courseId ? "Found a perfect match!" : "Processing your request..."
      );
      setCallStatus(CallStatus.FINISHED);
      if (courseId) {
        if (courseId === "no-match") {
          router.push("/no-match");
        } else {
          router.push(`/dashboard/courses/${courseId}`);
        }
      } else {
        router.push("/no-match");
      }
      // Redirect based on what's in the store
      //   setTimeout(() => {
      //     onClose();

      //     } else {
      //       // If no recommendation in store, go to dashboard
      //       router.push("/dashboard");
      //     }
      //   }, 1000);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript || message.content,
        };
        setMessages(prev => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    // const onError = (error: Error) => {
    //   console.error("VAPI Error:", error);
    //   setCallStatus(CallStatus.INACTIVE);
    // };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    // vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      //   vapi.off("error", onError);
    };
  }, [isOpen, onClose, router]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCallStatus(CallStatus.INACTIVE);
      setMessages([]);
      conversationDataRef.current = {};
      setProcessingStatus("");
    }
  }, [isOpen]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStartCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
        variableValues: {}, // Pass any variables needed by your workflow
      });
    } catch (error) {
      console.error("Failed to start VAPI:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleEndCall = () => {
    vapi.stop();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0f0e14] text-white rounded-xl w-full max-w-2xl p-6 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Learning Assistant</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Voice Animation */}
          <div className="relative w-36 h-36 mb-6">
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-50"
              )}
            >
              {/* Outer circle */}
              <div
                className={cn(
                  "absolute w-36 h-36 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 opacity-30",
                  isSpeaking && "animate-ping"
                )}
              />
              {/* Middle circle */}
              <div
                className={cn(
                  "absolute w-28 h-28 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 opacity-40",
                  isSpeaking && "animate-pulse"
                )}
              />
              {/* Inner circle */}
              <div className="absolute w-20 h-20 rounded-full bg-[#0f0e14] flex items-center justify-center">
                <Mic
                  size={36}
                  className={cn(
                    "text-white transition-transform",
                    isSpeaking && "scale-110 text-blue-400"
                  )}
                />
              </div>

              {/* Voice waves */}
              {isSpeaking && (
                <>
                  <div className="absolute w-full h-full">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 opacity-0"
                        style={{
                          width: `${100 + i * 20}%`,
                          height: `${100 + i * 20}%`,
                          animationName: "ripple",
                          animationDuration: "2s",
                          animationTimingFunction: "ease-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${i * 0.6}s`,
                        }}
                      />
                    ))}
                  </div>
                  <style jsx>{`
                    @keyframes ripple {
                      0% {
                        opacity: 0.4;
                        transform: translate(-50%, -50%) scale(0.8);
                      }
                      100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(1);
                      }
                    }
                  `}</style>
                </>
              )}
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={transcriptRef}
            className="w-full h-48 bg-black/30 rounded-lg p-4 overflow-y-auto mb-6"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "mb-3 p-2 rounded-lg animate-fadeIn",
                  msg.role === "assistant"
                    ? "bg-blue-900/30 text-blue-100"
                    : "bg-purple-900/30 text-purple-100"
                )}
              >
                <span className="font-bold">
                  {msg.role === "assistant" ? "Assistant: " : "You: "}
                </span>
                {msg.content}
              </div>
            ))}

            {callStatus === CallStatus.ACTIVE && isSpeaking && (
              <div className="flex items-center space-x-2 text-blue-300">
                <span>Assistant is speaking</span>
                <span className="flex space-x-1">
                  <span className="animate-bounce delay-0 h-2 w-2 bg-blue-300 rounded-full"></span>
                  <span className="animate-bounce delay-150 h-2 w-2 bg-blue-300 rounded-full"></span>
                  <span className="animate-bounce delay-300 h-2 w-2 bg-blue-300 rounded-full"></span>
                </span>
              </div>
            )}

            {callStatus === CallStatus.PROCESSING && (
              <div className="flex items-center justify-center space-x-2 text-blue-300 mt-4">
                <span className="animate-pulse">{processingStatus}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="w-full flex justify-center">
            {callStatus === CallStatus.INACTIVE && (
              <button
                onClick={handleStartCall}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center"
              >
                Start Conversation
              </button>
            )}

            {callStatus === CallStatus.CONNECTING && (
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium opacity-70 cursor-not-allowed flex items-center">
                <span className="animate-pulse">Connecting...</span>
              </button>
            )}

            {callStatus === CallStatus.ACTIVE && (
              <button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
              >
                End Conversation
              </button>
            )}

            {callStatus === CallStatus.PROCESSING && (
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium opacity-70 cursor-not-allowed flex items-center">
                <span className="animate-pulse">Processing...</span>
              </button>
            )}

            {callStatus === CallStatus.FINISHED && (
              <div className="text-center">
                <div className="mb-2 text-green-400">Conversation ended</div>
                <p className="text-gray-400 text-sm">
                  Redirecting to recommended course...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VAPIModal;
