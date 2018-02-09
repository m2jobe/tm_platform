#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER tm WITH PASSWORD 'password' CREATEDB;
    CREATE DATABASE tm_dev;
    GRANT ALL PRIVILEGES ON DATABASE tm_dev TO tm;
EOSQL
