import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>
        <div style={{ padding: "20px" }}>
          <h1>School Manager</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
