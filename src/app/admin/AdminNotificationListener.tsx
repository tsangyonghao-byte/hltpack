"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getUnreadMessagesCountAndLatest } from "@/actions/messageActions";
import { MessageSquare } from "lucide-react";

export default function AdminNotificationListener() {
  const lastCountRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    async function checkUnread() {
      try {
        const res = await getUnreadMessagesCountAndLatest();
        if (!active) return;
        if (!res.success) return;

        const currentCount = res.count ?? 0;

        if (lastCountRef.current === null) {
          // Initial load: set the baseline count without notifying
          lastCountRef.current = currentCount;
        } else if (currentCount > lastCountRef.current) {
          // New message detected!
          lastCountRef.current = currentCount;
          playNotificationSound();

          const latestMsg = res.latest;
          const name = latestMsg ? latestMsg.name : "Customer";
          const snippet = latestMsg && latestMsg.content 
            ? latestMsg.content.slice(0, 60) + (latestMsg.content.length > 60 ? "..." : "")
            : "Sent an inquiry";

          toast.success(`New Inquiry from ${name}`, {
            duration: 8000,
            icon: <MessageSquare className="w-5 h-5 text-green-500 shrink-0" />,
            description: snippet,
            action: {
              label: "View Inquiries",
              onClick: () => {
                window.location.href = "/admin/messages";
              },
            },
          });
        } else {
          // Count might have gone down (e.g. read/deleted), update baseline
          lastCountRef.current = currentCount;
        }
      } catch (err) {
        // Fail silently to avoid spamming logs during network fluctuations
      }
    }

    // Check on mount
    checkUnread();

    // Poll every 15 seconds
    const interval = setInterval(checkUnread, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return null;
}

function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play a friendly dual-tone chime (C5 to E5)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "sine";
    
    // Tone 1: C5 (523.25 Hz)
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    // Tone 2: E5 (659.25 Hz)
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, ctx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    console.warn("Audio Context playback failed:", e);
  }
}
