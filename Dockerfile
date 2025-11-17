FROM node:20-alpine

WORKDIR /app

# package.json과 lock 파일 복사
COPY package*.json ./

# 전체 의존성 설치 (빌드 포함)
RUN npm ci

# 소스 전체 복사
COPY . .

# Next.js 빌드
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
