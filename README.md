# Platform Announcements

A web interface for merging sound snippets into platform announcements

## Development & Setup

### With Docker

1. Build the container

```console
docker build -t platform-announcements:latest .
```

2. Run the container

```console
docker run -p 8080:80 platform-announcements                                         # production
docker run -p 8080:80 -v ./public:/usr/local/apache2/htdocs platform-announcements   # development
```

3. Open a web browser and go to `http://localhost:8080`

### Without Docker

1. Clone this repository to a web server, for example based on nginx or Apache
2. Set the `public` folder as your web root directory
