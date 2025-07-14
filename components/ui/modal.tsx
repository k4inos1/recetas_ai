"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose, className, ...props }: ModalProps) => {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 flex items-center justify-center",
        className
      )}
      onClick={onClose}
      {...props}
    >
      <div
        className="bg-background rounded-lg shadow-lg max-w-lg w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export { Modal };
