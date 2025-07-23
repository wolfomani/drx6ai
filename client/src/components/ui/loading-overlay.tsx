import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message = "جاري المعالجة..." }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-surface border border-border-dark rounded-2xl p-6 flex items-center gap-4 shadow-2xl">
        <Loader2 className="w-6 h-6 text-dr-blue animate-spin" />
        <span className="text-text-primary">{message}</span>
      </div>
    </div>
  );
}
