.PHONY: build init update bash addprj deploy serve fshell flog clean beautify installpkg

build:
	docker build -t substance-demo-sn . --no-cache

setup:
	sudo docker volume create subs-demo-sn-nodemodules

update:
	docker-compose run -w /opt/app app \
		npm update

login:
	docker-compose run -w /opt/app app \
		expo login -u $(USER) -p $(PASS)

dev:
	docker-compose up

dev-detach:
	docker-compose up -d

it:
	docker-compose exec app sh

clean:
	docker-compose rm

beautify:
	docker-compose run -w /opt/app app \
		 js-beautify -r $(FILES)

installpkg:
	 docker-compose run -w /opt/app app \
		 npm install $(ARGS) $(PKGS)

uninstallpkg:
	 docker-compose run -w /opt/app app \
		 npm uninstall $(PKGS)
