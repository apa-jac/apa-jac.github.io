run:
	browser-sync start -s -f . --no-notify

install:
	npm install

.PHONY: install run
