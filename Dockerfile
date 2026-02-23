FROM node:25-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
# Copy the built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx config to allow logging to /logs
COPY nginx.conf /etc/nginx/nginx.conf

# Give nginx user permissions for /logs
RUN mkdir -p /logs && chown -R nginx:nginx /logs

VOLUME ["/logs"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
