import { notFound } from "next/navigation";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return <div className="editor-root">{children}</div>;
}
