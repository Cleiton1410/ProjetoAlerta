# Usar uma imagem PHP com Apache
FROM php:7.4-apache

# Instalar as extensões necessárias para conexão com MySQL
RUN docker-php-ext-install mysqli

# Habilitar o módulo de reescrita do Apache
RUN a2enmod rewrite

# Expor a porta 80
EXPOSE 80
