DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'app_user') THEN
        CREATE USER app_user WITH PASSWORD 'yourpassword';
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE testdb TO app_user;

GRANT ALL ON SCHEMA public TO app_user;
