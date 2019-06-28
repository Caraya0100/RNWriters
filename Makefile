setup:
	sudo docker volume create substance-demo-store-nodemodules

install-expo:
	sudo docker-compose -f docker-compose.builder.yml run --rm install-expo

install:
	sudo docker-compose -f docker-compose.builder.yml run --rm install

dev:
	sudo docker-compose up

dev-detach:
	sudo docker-compose up -d

dev-it:
	sudo docker-compose exec app sh
