FROM php:8.2-fpm-alpine

# Cài gói phụ thuộc trước khi cài PHP extensions
RUN apk add --no-cache \
    oniguruma-dev \
    libzip-dev \
    zip \
    icu-dev \
    g++ \
    make \
    autoconf \
    gcc \
    libc-dev \
    pkgconfig \
    zlib-dev

# Cài các PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


