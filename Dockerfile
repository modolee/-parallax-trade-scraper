###############
# Build Phase #
###############
FROM node:16-alpine as builder

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# package 정의 파일 복사
COPY package.json ./
COPY yarn.lock ./

# package 설치
RUN yarn

# 소스 복사
COPY . .

# Nest Build
RUN yarn build

#############
# Run Phase #
#############
FROM node:16-alpine as runner

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# chromium 설치
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# npm install 시 Chromium 다운로드 제외 처리
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# 실행할 명령어
ENTRYPOINT ["node", "dist/main"]