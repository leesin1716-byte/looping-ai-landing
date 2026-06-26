"use client";
import { Component, type ReactNode } from "react";

/**
 * Minimal error boundary. Renders `fallback` (default: nothing) if a child
 * throws during render — used to keep a non-essential, failure-prone subtree
 * (e.g. the WebGL hero) from taking down the whole page.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("ErrorBoundary caught:", error);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
