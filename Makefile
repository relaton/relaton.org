SHELL := /bin/bash

all: _site

clean:
	rm -rf _site _software/*/.git _software/*/docs _software/*/_*_repo _specs/relaton-model-diagrams parent-hub .jekyll-* .sass-cache

bundle:
	bundle

_site:
	bundle exec jekyll build --trace

serve:
	bundle exec jekyll serve --trace

.PHONY: bundle all open serve distclean clean
