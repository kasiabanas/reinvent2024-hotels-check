FROM mcr.microsoft.com/playwright:v1.47.2-noble

ADD . /src

WORKDIR /src

RUN cd /src \
	&& npm install

CMD npx playwright test --project webkit --reporter=line
