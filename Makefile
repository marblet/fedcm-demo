.PHONY: help setup install mkcert-install certs dev dev-idp dev-rp build

IDP_HOST := idp.local
IDP_PORT := 3000
RP_HOST := rp.local
RP_PORT := 3001

help:
	@echo "Usage:"
	@echo "  make setup   Install deps, install mkcert CA, and create certs"
	@echo "  make dev     Start IdP and RP with local HTTPS"
	@echo "  make certs   Create local HTTPS certificates"
	@echo "  make build   Type-check/build both apps"

setup: install mkcert-install certs

install:
	npm --prefix idp install
	npm --prefix rp install

mkcert-install:
	@if ! command -v mkcert >/dev/null 2>&1; then \
		echo "mkcert is not installed. Install it first, then run make setup again."; \
		echo "macOS: brew install mkcert"; \
		exit 1; \
	fi
	mkcert -install

certs:
	@if ! command -v mkcert >/dev/null 2>&1; then \
		echo "mkcert is not installed. Install it first, then run make certs again."; \
		echo "macOS: brew install mkcert"; \
		exit 1; \
	fi
	mkdir -p certs
	@if [ ! -f certs/$(IDP_HOST).pem ] || [ ! -f certs/$(IDP_HOST)-key.pem ]; then \
		mkcert -cert-file certs/$(IDP_HOST).pem -key-file certs/$(IDP_HOST)-key.pem $(IDP_HOST); \
	else \
		echo "certs/$(IDP_HOST).pem already exists"; \
	fi
	@if [ ! -f certs/$(RP_HOST).pem ] || [ ! -f certs/$(RP_HOST)-key.pem ]; then \
		mkcert -cert-file certs/$(RP_HOST).pem -key-file certs/$(RP_HOST)-key.pem $(RP_HOST); \
	else \
		echo "certs/$(RP_HOST).pem already exists"; \
	fi

dev: certs
	$(MAKE) -j2 dev-idp dev-rp

dev-idp:
	npm --prefix idp run dev:local

dev-rp:
	npm --prefix rp run dev:local

build:
	npm --prefix idp run build
	npm --prefix rp run build
