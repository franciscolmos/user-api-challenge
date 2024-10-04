
# Build and run the containers:

``` 
  docker-compose up --build
```

# To view the database, download https://www.mongodb.com/docs/compass/current/install/ and use the following string connection:

```
  mongodb://admin:secret@localhost:27017/admin
```

# Use the file: user-api.postman_collection.json from the root of the project to create all endpoints in postman

# Images are stored whithin the container volume. To access the container and view the images, follow the following steps:

```
  $ docker ps
  $ docker exec -it <container id> /bin/sh
  $ cd uploads
  $ ls -la
```