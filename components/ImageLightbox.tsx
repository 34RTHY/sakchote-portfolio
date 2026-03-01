"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("overflow-hidden");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Clean up on unmount
  useEffect(() => {
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <>
      <div onClick={open} className="cursor-zoom-in">
        {children}
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90" />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 text-warm-400 hover:text-white transition p-2"
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div
          className={`relative w-full h-full max-w-6xl max-h-[85vh] transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>

        {/* Caption */}
        {alt && (
          <p
            className={`absolute bottom-4 text-sm text-warm-400 text-center transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {alt}
          </p>
        )}
      </div>
    </>
  );
}
