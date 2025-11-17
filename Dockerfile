FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 lock 파일만 복사
COPY package*.json ./

# 프로덕션용 node_modules 설치
RUN npm ci --only=production

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \

# 호스트에서 빌드한 .next, public, package.json, node_modules 복사
COPY .next ./.next
COPY public ./public
COPY package.json ./
COPY locale ./locale

# 3000 포트 노출
EXPOSE 3000

# 컨테이너 시작 시 Next.js 실행
CMD ["npm", "run", "start"]
