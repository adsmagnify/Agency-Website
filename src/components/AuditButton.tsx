"use client";

import React from "react";
import "./AuditButton.css";

export interface AuditButtonProps {
  href?: string;
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default function AuditButton({
  href = "mailto:adsmagnify@gmail.com",
  text = "Get a Free Growth Audit →",
  onClick,
  className = "",
}: AuditButtonProps) {
  const content = (
    <div className={`btn-wrapper ${className}`} onClick={onClick} data-cursor-text="AUDIT">
      <div className="light" />
      <div
        className="gradient-layer"
        style={{ animationDelay: "0s", animationDuration: "25s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "0.15s", animationDuration: "15.9s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "0.53s", animationDuration: "26.4s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "0.45s", animationDuration: "17.8s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "1.6s", animationDuration: "19.2s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "1.6s", animationDuration: "29.2s" }}
      />
      <div
        className="gradient-layer"
        style={{ animationDelay: "1.6s", animationDuration: "20.2s" }}
      />
      <button className="gradient-btn" type="button" tabIndex={-1}>
        {text}
      </button>
      <div className="text-overlay">{text}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block text-decoration-none select-none">
        {content}
      </a>
    );
  }

  return content;
}
