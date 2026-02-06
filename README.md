<<<<<<< HEAD
# erp-ci
=======
# ERP Starter (Facturación + POS) — Infra + Multi-entorno

Este repo es un **starter kit** para levantar tu base de infraestructura con:

- PostgreSQL (por entorno)
- Redis (por entorno)
- API Node/Express (placeholder)
- Web Nginx (placeholder con SPA fallback para `/auth/login`)
- Docker Compose
- Jenkinsfile (deploy local con Docker)

> Importante: `localhost:8080-1` NO es un puerto válido (los puertos son números).
> Usa `8081`, `8082`, `8083` o usa subdominios con reverse proxy.

## Requisitos

- Docker + Docker Compose v2
- Git
- (Opcional) Jenkins

## Levantar 1 entorno

Desde la raíz del repo:

```bash
cd infra/compose
docker compose --env-file ../env/.env.crt -p erpperu2-crt up -d --build
```

Abre:

- http://localhost:8081/auth/login
- http://localhost:8081/

Checks:

- http://localhost:8081/api/health
- http://localhost:8081/api/db-check
- http://localhost:8081/api/redis-check

## Levantar 3 entornos a la vez (crt, crt2, crt3)

```bash
cd infra/compose

docker compose --env-file ../env/.env.crt  -p erpperu2-crt  up -d --build
docker compose --env-file ../env/.env.crt2 -p erpperu2-crt2 up -d --build
docker compose --env-file ../env/.env.crt3 -p erpperu2-crt3 up -d --build
```

URLs:

- crt:  http://localhost:8081/auth/login
- crt2: http://localhost:8082/auth/login
- crt3: http://localhost:8083/auth/login

## Bajar un entorno

```bash
cd infra/compose
docker compose --env-file ../env/.env.crt -p erpperu2-crt down -v
```

> `-v` borra los volúmenes (datos). Úsalo solo si quieres reiniciar el DB.

## Jenkins (local)

Este repo incluye un `Jenkinsfile` con un parámetro `TARGET_ENV` para desplegar a `crt/crt2/crt3` usando Docker Compose.

Requisito clave: **el usuario Jenkins debe poder ejecutar Docker**.

- Si Jenkins corre en Linux como servicio: añade el usuario `jenkins` al grupo `docker`.
- Si Jenkins corre en contenedor: monta `/var/run/docker.sock` y el binario docker (o usa Docker-in-Docker).

Luego crea un Pipeline Job en Jenkins apuntando a este repo.
>>>>>>> c0f712f (subiendo confi de jenkins)
