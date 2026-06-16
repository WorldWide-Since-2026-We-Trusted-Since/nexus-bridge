import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, X, Send, Users, User, Clock, Shield, Hash } from "lucide-react";

interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: "group" | "direct";
  auditLevel: "public" | "internal" | "classified";
  signature?: string;
}

interface ChatSession {
  id: string;
  name: string;
  type: "group" | "direct";
  participants: number;
  lastActivity: number;
  unread: number;
  sessionLink: string;
}

const SESSION_GROUP_ID = "05be1557e96f2c84cbe22905e262b41393513d9ec64762c0da67d731159c2f214b";

const MOCK_SESSIONS: ChatSession[] = [
  {
    id: SESSION_GROUP_ID,
    name: "EU-IE Command Group",
    type: "group",
    participants: 12,
    lastActivity: Date.now(),
    unread: 3,
    sessionLink: `session:${SESSION_GROUP_ID}`,
  },
  {
    id: "direct-1",
    name: "Infrastructure Lead",
    type: "direct",
    participants: 2,
    lastActivity: Date.now() - 3600000,
    unread: 0,
    sessionLink: "session:direct-infra",
  },
  {
    id: "direct-2",
    name: "Treaty Coordinator",
    type: "direct",
    participants: 2,
    lastActivity: Date.now() - 7200000,
    unread: 1,
    sessionLink: "session:direct-treaty",
  },
];

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sessionId: SESSION_GROUP_ID,
    senderId: "user-1",
    senderName: "Command Center",
    content: "System online. All infrastructure nodes reporting green status.",
    timestamp: Date.now() - 1800000,
    type: "group",
    auditLevel: "internal",
    signature: "SHA256:a1b2c3...",
  },
  {
    id: "msg-2",
    sessionId: SESSION_GROUP_ID,
    senderId: "user-2",
    senderName: "Infrastructure Lead",
    content: "Phase II treaty documentation ready for review.",
    timestamp: Date.now() - 900000,
    type: "group",
    auditLevel: "internal",
    signature: "SHA256:d4e5f6...",
  },
  {
    id: "msg-3",
    sessionId: SESSION_GROUP_ID,
    senderId: "user-3",
    senderName: "Security Ops",
    content: "Audit trail confirmed. All communications logged with timestamps.",
    timestamp: Date.now() - 300000,
    type: "group",
    auditLevel: "classified",
    signature: "SHA256:g7h8i9...",
  },
];

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return `${d.toISOString().slice(0, 10)} ${d.toTimeString().slice(0, 8)} UTC`;
}

function getAuditColor(level: ChatMessage["auditLevel"]): string {
  switch (level) {
    case "public": return "text-[var(--status-active)]";
    case "internal": return "text-[var(--gold)]";
    case "classified": return "text-[var(--status-critical)]";
  }
}

function SessionLink({ link, className }: { link: string; className?: string }) {
  const isSession = link.startsWith("session:");
  if (!isSession) return <span className={className}>{link}</span>;
  
  const sessionId = link.replace("session:", "");
  return (
    <a
      href={`https://getsession.org/group/${sessionId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[10px]",
        "rounded border border-[var(--holo)]/30 bg-[oklch(0.78_0.16_230_/_0.1)]",
        "px-1.5 py-0.5 text-holo hover:bg-[oklch(0.78_0.16_230_/_0.2)] transition-colors",
        className
      )}
    >
      <Hash className="h-3 w-3" />
      {sessionId.slice(0, 16)}...
    </a>
  );
}

export function ChatPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<string>(SESSION_GROUP_ID);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSessionData = MOCK_SESSIONS.find((s) => s.id === activeSession);
  const sessionMessages = messages.filter((m) => m.sessionId === activeSession);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionMessages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: activeSession,
      senderId: "current-user",
      senderName: "You",
      content: inputValue,
      timestamp: Date.now(),
      type: activeSessionData?.type || "group",
      auditLevel: "internal",
      signature: `SHA256:${Math.random().toString(36).slice(2, 10)}...`,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex h-14 w-14 items-center justify-center rounded-full",
          "border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.15)]",
          "shadow-[0_0_24px_oklch(0.78_0.16_230_/_0.4)] transition-all",
          "hover:scale-110 hover:shadow-[0_0_32px_oklch(0.78_0.16_230_/_0.6)]",
          isOpen && "scale-110 ring-2 ring-[var(--holo)]"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-holo" />
        ) : (
          <>
            <MessageSquare className="h-5 w-5 text-holo" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--status-critical)] text-[10px] font-bold text-white">
              3
            </span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[420px] overflow-hidden rounded-xl border border-[var(--holo)]/30 bg-[oklch(0.12_0.04_250_/_0.95)] shadow-[0_0_48px_oklch(0_0_0_/_0.5)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--holo)]/20 bg-[oklch(0.15_0.04_250_/_0.8)] px-4 py-3">
            <div className="flex items-center gap-3">
              {activeSessionData?.type === "group" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--holo)]/30 bg-[oklch(0.78_0.16_230_/_0.1)]">
                  <Users className="h-4 w-4 text-holo" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--gold)]/30 bg-[oklch(0.82_0.14_85_/_0.1)]">
                  <User className="h-4 w-4 text-gold" />
                </div>
              )}
              <div>
                <div className="font-display text-sm text-foreground">{activeSessionData?.name}</div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Shield className="h-3 w-3 text-[var(--status-active)]" />
                  <span>E2E Encrypted</span>
                  <span>•</span>
                  <span>{activeSessionData?.participants} participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[var(--status-active)]/30 bg-[oklch(0.78_0.18_155_/_0.1)] px-2 py-0.5 text-[10px] text-[var(--status-active)]">
                LIVE
              </span>
            </div>
          </div>

          {/* Session Tabs */}
          <div className="flex gap-1 border-b border-[var(--holo)]/20 bg-[oklch(0.12_0.04_250_/_0.8)] px-3 py-2">
            {MOCK_SESSIONS.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeSession === session.id
                    ? "bg-[oklch(0.78_0.16_230_/_0.15)] text-holo"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {session.type === "group" ? (
                  <Users className="h-3 w-3" />
                ) : (
                  <User className="h-3 w-3" />
                )}
                <span className="max-w-[100px] truncate">{session.name}</span>
                {session.unread > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--status-critical)] px-1 text-[9px] font-bold text-white">
                    {session.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Session ID Display */}
          <div className="flex items-center justify-between border-b border-[var(--holo)]/10 bg-[oklch(0.10_0.03_250)] px-4 py-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Session Link</span>
            <SessionLink link={activeSessionData?.sessionLink || ""} />
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto bg-[oklch(0.08_0.03_250_/_0.6)] px-4 py-3">
            <div className="mb-4 text-center">
              <span className="rounded-full border border-[var(--holo)]/20 bg-[oklch(0.78_0.16_230_/_0.1)] px-3 py-1 text-[10px] text-holo">
                AUDIT TRAIL ENABLED
              </span>
            </div>
            
            {sessionMessages.map((msg, i) => (
              <div
                key={msg.id}
                className={cn(
                  "mb-3 animate-grow-in",
                  msg.senderId === "current-user" && "ml-auto max-w-[85%]"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={cn(
                    "rounded-lg border p-3",
                    msg.senderId === "current-user"
                      ? "border-[var(--holo)]/30 bg-[oklch(0.78_0.16_230_/_0.1)]"
                      : "border-border bg-[oklch(0.15_0.04_250_/_0.6)]"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-holo">{msg.senderName}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[9px] uppercase", getAuditColor(msg.auditLevel))}>
                        {msg.auditLevel}
                      </span>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{msg.content}</p>
                  <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                    <span className="font-mono text-[8px] text-muted-foreground/60">
                      {msg.signature}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-[var(--holo)]/20 bg-[oklch(0.12_0.04_250_/_0.95)] px-3 py-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Enter secure message..."
              className="flex-1 rounded-md border border-border bg-[oklch(0.08_0.03_250)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--holo)]/50 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--holo)]/50 bg-[oklch(0.78_0.16_230_/_0.15)] text-holo transition-colors hover:bg-[oklch(0.78_0.16_230_/_0.25)]"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--holo)]/10 bg-[oklch(0.08_0.03_250)] px-3 py-1.5 text-[9px] text-muted-foreground">
            <span>Session ID: {SESSION_GROUP_ID.slice(0, 20)}...</span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-[var(--status-active)]" />
              Decentralized
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
