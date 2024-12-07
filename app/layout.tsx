"use client"

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Crie a instância do QueryClient
const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>
        {/* Envolva o conteúdo da página com o QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <div style={{ padding: "20px" }}>
            <h1>School Manager</h1>
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
