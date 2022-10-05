build:
	rm -rf dist build
	npm ci
	npm ls -json > dependency.json
	npm run build --verbose

storybook:
	npm run storybook

apidoc:
	cd ../../.. ; mvn -s settings.xml -DskipTests=true -Dnpm.test.phase= -B -PCENTRAL,CMQA,json-schema,doc compile

clear:
	cd ../../.. ; docker-compose down ; docker kill $(docker ps -q) ; docker rm $(docker ps -aq) ; sudo docker system prune --all ; docker-compose build

up:
	cd ../../.. ; docker-compose up

hotswap:
	cd ../../.. ; ./fe-hotswap.sh

license:
	npm run license-csv ; mv -f used_licences.csv used_licences_checked.csv

depcheck:
	npx depcheck

.PHONY: build
