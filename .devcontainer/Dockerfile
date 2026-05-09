FROM debian:trixie

RUN apt-get update && apt-get install -y \
	build-essential \
	curl \
	git \
	python3 \
	python3-pip \
	nodejs \
	npm \
	postgresql \
	postgresql-contrib \
	&& rm -rf /var/lib/apt/lists/* 

WORKDIR /workspace