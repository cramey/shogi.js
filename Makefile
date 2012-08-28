CLOSURE_PATH=~/closure/compiler.jar
VERSION=1.0

shogi-${VERSION}.compiled.js: shogi.js
	java -jar ${CLOSURE_PATH} --js $^ --js_output_file $@

clean:
	rm shogi-*.compiled.js
