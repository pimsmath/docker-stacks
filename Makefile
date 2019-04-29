# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
.PHONY: docs help test

# Use bash for inline if-statements in arch_patch target
SHELL:=bash
OWNER:=pimsubc
ARCH:=$(shell uname -m)

# Get the current git commit hash
COMMIT := $$(git log -1 --pretty=%h)

# Need to list the images in build dependency order
ifeq ($(ARCH),ppc64le)
ALL_STACKS:=base-notebook
else
ALL_STACKS:=base-notebook \
	minimal-notebook \
	scipy-notebook \
	pims-minimal \
	pims-r \
	callysto-swift
endif

ALL_IMAGES:=$(ALL_STACKS)

help:
# http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
	@echo "jupyter/docker-stacks"
	@echo "====================="
	@echo "Replace % with a stack directory name (e.g., make build/minimal-notebook)"
	@echo
	@grep -E '^[a-zA-Z0-9_%/-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

arch_patch/%: ## apply hardware architecture specific patches to the Dockerfile
	@if [ -e ./$(notdir $@)/Dockerfile.$(ARCH).patch ]; then \
		if [ -e ./$(notdir $@)/Dockerfile.orig ]; then \
               		cp -f ./$(notdir $@)/Dockerfile.orig ./$(notdir $@)/Dockerfile;\
		else\
                	cp -f ./$(notdir $@)/Dockerfile ./$(notdir $@)/Dockerfile.orig;\
		fi;\
		patch -f ./$(notdir $@)/Dockerfile ./$(notdir $@)/Dockerfile.$(ARCH).patch; \
	fi

build/%: DARGS?=
build/%: ## build the latest image for a stack
	docker build $(DARGS) --rm --force-rm -t $(OWNER)/$(notdir $@):$(COMMIT) ./$(notdir $@)
	docker tag $(OWNER)/$(notdir $@):$(COMMIT) $(OWNER)/$(notdir $@):latest

build-all: $(foreach I,$(ALL_IMAGES),arch_patch/$(I) build/$(I) ) ## build all stacks
build-test-all: $(foreach I,$(ALL_IMAGES),arch_patch/$(I) build/$(I) test/$(I) ) ## build and test all stacks

dev/%: ARGS?=
dev/%: DARGS?=
dev/%: PORT?=8888
dev/%: ## run a foreground container for a stack
	docker run -it --rm -p $(PORT):8888 $(DARGS) $(OWNER)/$(notdir $@) $(ARGS)

dev-env: ## install libraries required to build docs and run tests
	pip install -r requirements-dev.txt

docs: ## build HTML documentation
	make -C docs html

test/docs: ## check links in Sphinx documentation
	make -C docs

test/%: ## run tests against a stack
	@TEST_IMAGE="$(OWNER)/$(notdir $@)" pytest test

test/base-notebook: ## test supported options in the base notebook
	@TEST_IMAGE="$(OWNER)/$(notdir $@)" pytest test pims-minimal/test

test/pims-r: ## re-run the base notebook tests in the pims-r container to ensure tests still pass
	@TEST_IMAGE="$(OWNER)/$(notdir $@)" pytest test pims-minimal/test

test/callysto-swift: ## ignore tests for swiftfs since it requires a functional swift environment
	@echo ""

verify/%: ## verify an image works by testing it across several notebooks
	docker run -it --rm --mount source=$$(pwd)/test-notebooks,target=/test-notebooks,type=bind $(OWNER)/$(notdir $@) bash /test-notebooks/test.sh

callysto/push: ## push callysto images to docker hub
ifndef DOCKER_USERNAME
	$(error DOCKER_USERNAME is not set)
endif

ifndef DOCKER_PASSWORD
	$(error DOCKER_PASSWORD is not set)
endif

	@docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD) ; \
	docker push callysto/base-notebook ; \
	docker push callysto/minimal-notebook ; \
	docker push callysto/scipy-notebook ; \
	docker push callysto/pims-minimal ; \
	docker push callysto/pims-r ; \
	docker push callysto/callysto-swift
