FROM alpine:3.22
RUN apk add --no-cache nodejs npm && \
    adduser -D -h /home/node node && \
    mkdir /app && chown node /app
USER node
WORKDIR /app

CMD ["node","--version"]