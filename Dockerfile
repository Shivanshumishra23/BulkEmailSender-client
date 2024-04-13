# Stage 1: Build stage
FROM node:alpine as build
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 3000  
CMD ["nginx", "-g", "daemon off;"]
