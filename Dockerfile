FROM node:24-slim

# Cria a pasta e já define o dono como 'node' antes de copiar os arquivos
RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

# Copia apenas os arquivos de definição primeiro
COPY --chown=node:node package*.json ./

# Muda para o usuário seguro ANTES de instalar
USER node

RUN npm install

# Copia o resto do código garantindo que o usuário node seja o dono
COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]