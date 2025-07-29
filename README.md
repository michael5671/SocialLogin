
Backend:  
$ cd SocialLogin/Backend  
$ cp .env.example .env  
$ docker-compose up --build -d  
$ docker-compose exec php composer install  
$ docker compose exec php php artisan key:generate  
$ docker compose exec php chmod -R 777 storage bootstrap/cache  
$ docker compose exec php php artisan migrate  

Fontend:  
$ cd SocialLogin/Fontend  
$ nvm use 20  
$ npm install  
$ npm run dev   

