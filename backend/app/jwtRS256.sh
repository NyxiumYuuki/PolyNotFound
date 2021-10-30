#!/usr/bin/env bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -q -N ""
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
rm .env
echo "JWTRS256_PRIVATE_KEY='`cat ./jwtRS256.key | base64 -w 0`'" >> .env
echo "JWTRS256_PUBLIC_KEY='`cat ./jwtRS256.key.pub | base64 -w 0`'" >> .env
source .env
rm jwtRS256.key
