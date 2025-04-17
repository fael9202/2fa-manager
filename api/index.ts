import { connectDatabase } from "./src/config/database.js";
import {
  listCodes,
  createCode,
  deleteCode,
} from "./src/controllers/twoFactorController.js";
import type { TwoFactorInput } from "./src/types/twoFactor.js";

// Conexão com MongoDB
await connectDatabase();

// Configuração do servidor
const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Configuração do CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Tratamento de CORS
    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      // Listar todos os códigos
      if (url.pathname === "/api/2fa" && req.method === "GET") {
        const response = await listCodes();
        return new Response(JSON.stringify(response), {
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      // Adicionar novo código
      if (url.pathname === "/api/2fa" && req.method === "POST") {
        const body = (await req.json()) as TwoFactorInput;
        const response = await createCode(body);
        return new Response(JSON.stringify(response), {
          status: response.success ? 201 : 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      // Deletar código
      if (url.pathname.startsWith("/api/2fa/") && req.method === "DELETE") {
        const id = url.pathname.split("/").pop();
        const response = await deleteCode(id!);
        return new Response(JSON.stringify(response), {
          status: response.success ? 204 : 404,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      // Rota não encontrada
      return new Response(
        JSON.stringify({ success: false, error: "Rota não encontrada" }),
        {
          status: 404,
          headers: { ...headers, "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Erro interno do servidor" }),
        {
          status: 500,
          headers: { ...headers, "Content-Type": "application/json" },
        }
      );
    }
  },
});

console.log(`Servidor rodando em http://localhost:${server.port}`);
