FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip \
 && docker-php-ext-install mbstring exif pcntl bcmath gd \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite headers

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

WORKDIR /var/www/html

COPY . /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
