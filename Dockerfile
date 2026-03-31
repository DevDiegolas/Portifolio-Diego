# Usa uma imagem oficial e super leve do Node.js
FROM node:20-alpine

# Define a pasta de trabalho lá dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (isso deixa o Docker mais rápido)
COPY package*.json ./

# Instala as bibliotecas
RUN npm install

# Copia o resto do código do seu PC para o container
COPY . .

# Expõe a porta que o Vite (React) usa por padrão
EXPOSE 5173

# O comando para rodar o servidor de desenvolvimento (o --host é pro Docker liberar o acesso pra sua máquina)
CMD ["npm", "run", "dev", "--", "--host"]