open tests/reinvent.spec.ts

## Run witch GitlabCI

export following env vars for credentials
```
LOGIN=[my-login]
PASSWORD=[password]
```

use ci/cd schedule from gitlab, use "0 * * * *" as expression (gitlab scheduled pipelines  cannot run more frequently than once per 60 minutes.)

wait for email that pipeline was fixed :)

## Run with docker

Build image
```
docker build -t reinvent2024-hotels-check .
```
Run
```
docker run --rm -e LOGIN=... -e PASSWORD=... reinvent2024-hotels-check:latest
```
or if you want to pass test on empty state
```
docker run --rm -e LOGIN=... -e PASSWORD=... -e EMPTY_IS_SUCCESS=1 reinvent2024-hotels-check:latest
```

By default searched date is 2024-12-01 to 2024-12-06 and can be changed by env vars:
```
DATE_FROM=2024-11-30
DATE_TO=2024-12-07
```

https://github.com/kasiabanas/AWS-reInvent-hotel-check