FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# Make sure we don't copy local node_modules due to permission errors
# We'll install everything fresh.
RUN npm install
RUN npm install vite@latest vite-plugin-commonjs @originjs/vite-plugin-commonjs --save-dev

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
