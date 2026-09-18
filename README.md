# Loja Avistão

Site institucional/comercial da **Loja Avistão** e do **Ateliê Maria Emília**, em Pouso Redondo - SC.

## Estrutura

- `server.js`: servidor Express e API simples para registrar contatos.
- `public/index.html`: página principal.
- `public/atelier.html`: página dedicada ao Ateliê Maria Emília.
- `public/css/styles.css`: identidade visual e responsividade.
- `public/js/main.js`: menu mobile e formulário.
- `public/assets/`: placeholders de imagem e favicon.
- `data/contatos.json`: criado automaticamente quando o primeiro contato é enviado.

## Rodar localmente

```bash
npm install
npm start
```

Abra:

```
http://localhost:3000
```

## Conteúdo que deve ser trocado antes da divulgação

1. Substitua `public/assets/loja-placeholder.svg` por uma foto real da fachada/interior.
2. Substitua `public/assets/atelier-placeholder.svg` por uma foto real do Ateliê Maria Emília.
3. Atualize o horário em `public/index.html` no elemento `data-editable-hours`.
4. O formulário grava contatos localmente em `data/contatos.json`; em uma hospedagem serverless, troque isso por banco de dados ou serviço de e-mail.
5. O mapa usa o endereço informado e pode ser refinado para o ponto exato da entrada do ateliê quando houver uma referência mais precisa.

## Observação de acesso ao ateliê

O site já destaca que a entrada do Ateliê Maria Emília fica na rua de trás, com acesso por escada, e que atualmente não existe uma placa visível indicando a entrada.
