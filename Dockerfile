FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8080

LABEL "com.datadoghq.ad.check_names"='["node"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"node_status_url": "http://%%host%%:%%port%%/health"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "node", "service": "webapp"}]'

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]