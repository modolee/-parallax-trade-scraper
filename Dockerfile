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

COPY --from=builder /app/dist ./dist

# 실행할 명령어
ENTRYPOINT ["node", "./dist/main.js"]