FROM php:8.2-apache

WORKDIR /var/www/html

# Install dependencies for PostgreSQL and ZIP
RUN apt-get update && apt-get install -y libpq-dev zip unzip && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer.json ./

RUN composer install --no-dev --optimize-autoloader

COPY . .

# Apache configuration
RUN a2enmod rewrite

EXPOSE 80

CMD ["apache2-foreground"]
