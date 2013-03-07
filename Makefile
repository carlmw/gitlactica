TESTS = $(shell find test -name "*.js")

test:
	@./node_modules/.bin/mocha \
		--require ./test/setup \
		--reporter spec \
		$(TESTS)
browserify:
	@./node_modules/.bin/browserify \
		index.js \
		-o build.js
.PHONY: test