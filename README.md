# SocialLoginLaravel-Reacjs  
A web application that integrates **Google OAuth Login**. 
It includes two frontend implementations:
1. **React + Vite + MUI** frontend.
2. **Laravel Blade + Tailwind** frontend.

The backend is built with **Laravel** and **Sanctum** for authentication, containerized using **Docker**.


## 1.Backend Setup:  
$ cd SocialLogin/Backend  
$ cp .env.example .env  
$ docker-compose up --build -d  
$ docker-compose exec php composer install  
$ docker compose exec php php artisan key:generate  
$ docker compose exec php chmod -R 777 storage bootstrap/cache  
$ docker compose exec php php artisan migrate  

## 2.1.Fontend Setup (React + Vite + MUI):  
$ cd SocialLogin/Fontend  
$ nvm use 20  
$ npm install  
$ npm run dev   

## 2.2.Frontend Setup (Laravel Blade + Tailwind):
$ cd SocialLogin/Backend  
$ npm run dev

### Ports
- mysql: 4306  
- nginx: 8080  
- phpmyadmin: 8081  
- react: 5173  
