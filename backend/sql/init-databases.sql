-- Create databases for each microservice
CREATE DATABASE hyderabadinfra_users;
CREATE DATABASE hyderabadinfra_properties;
CREATE DATABASE hyderabadinfra_search;
CREATE DATABASE hyderabadinfra_notifications;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE hyderabadinfra_users TO hyderabadinfra;
GRANT ALL PRIVILEGES ON DATABASE hyderabadinfra_properties TO hyderabadinfra;
GRANT ALL PRIVILEGES ON DATABASE hyderabadinfra_search TO hyderabadinfra;
GRANT ALL PRIVILEGES ON DATABASE hyderabadinfra_notifications TO hyderabadinfra;