
test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec
browserify:
	@./node_modules/.bin/browserify \
		index.js \
		-o build.js
.PHONY: test