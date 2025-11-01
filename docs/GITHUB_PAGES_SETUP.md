# Configuração para GitHub Pages

## Passos para configurar o deploy no GitHub Pages:

### 1. Configurar o repositório
1. Faça fork ou clone este repositório
2. No arquivo `package.json`, atualize o campo `homepage`:
   ```json
   "homepage": "https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO"
   ```
   Exemplo: `"homepage": "https://felipebrenner.github.io/barcode-qrcode-reader"`

### 2. Instalar dependências
```bash
yarn install
```

### 3. Deploy manual (opcional)
```bash
yarn deploy
```

### 4. Deploy automático via GitHub Actions
O projeto já está configurado com GitHub Actions. Quando você fizer push para a branch `main` ou `master`, o deploy será feito automaticamente.

### 5. Configurar GitHub Pages no repositório
1. Vá para Settings > Pages no seu repositório GitHub
2. Em "Source", selecione "Deploy from a branch"
3. Selecione a branch `gh-pages` (será criada automaticamente após o primeiro deploy)
4. Clique em "Save"

### 6. Acessar a aplicação
Após alguns minutos, sua aplicação estará disponível em:
`https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO`

## Observações importantes:
- O GitHub Pages serve apenas conteúdo estático via HTTPS
- A funcionalidade da câmera funcionará corretamente no GitHub Pages pois usa HTTPS
- O deploy pode levar alguns minutos para ficar disponível
- Certifique-se de que o repositório seja público para usar GitHub Pages gratuito