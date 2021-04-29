build: build/index.html build/index.js

watch: build/index.html
	npx rollup -cw

node_modules:
	npm install

build/index.html: ./build
	npx pug-cli views/index.pug -o build

build/index.js: ./build node_modules
	npx rollup -c

./build:
	mkdir -p ./build

clean:
	-rm -rf build

cleanDeps:
	-rm -rf node_modules

.PHONY: build watch clean cleanDeps
