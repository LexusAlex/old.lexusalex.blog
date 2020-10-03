docker:
	docker run -ti --rm -v "$PWD":/usr/src/app -p "4000:4000" starefossen/github-pages
native:
	bundle exec jekyll serve