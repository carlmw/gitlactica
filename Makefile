
test:
	@./node_modules/.bin/mocha \
		--require ./test/setup \
		--reporter spec
browserify:
	@./node_modules/.bin/browserify \
		index.js \
		-o build.js
.PHONY: test