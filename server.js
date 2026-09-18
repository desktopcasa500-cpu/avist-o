const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contatos.json");

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(express.static(PUBLIC_DIR));

function sanitize(value, max = 500) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONTACTS_FILE);
  } catch {
    await fs.writeFile(CONTACTS_FILE, "[]\n", "utf8");
  }
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "loja-avistao",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/contato", async (req, res) => {
  try {
    const nome = sanitize(req.body.nome, 80);
    const telefone = sanitize(req.body.telefone, 40);
    const assunto = sanitize(req.body.assunto, 100);
    const mensagem = sanitize(req.body.mensagem, 1000);

    if (!nome || !telefone || !mensagem) {
      return res.status(400).json({
        ok: false,
        message: "Preencha nome, telefone e mensagem."
      });
    }

    await ensureStorage();

    const contatos = JSON.parse(await fs.readFile(CONTACTS_FILE, "utf8"));
    contatos.push({
      id: randomUUID(),
      nome,
      telefone,
      assunto,
      mensagem,
      criadoEm: new Date().toISOString()
    });

    await fs.writeFile(
      CONTACTS_FILE,
      JSON.stringify(contatos, null, 2) + "\n",
      "utf8"
    );

    return res.status(201).json({
      ok: true,
      message: "Mensagem recebida. A Loja Avistão poderá retornar pelo telefone informado."
    });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    return res.status(500).json({
      ok: false,
      message: "Não foi possível registrar sua mensagem agora. Fale pelo WhatsApp."
    });
  }
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.join(PUBLIC_DIR, "index.html"));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Loja Avistão disponível em http://localhost:${PORT}`);
});
