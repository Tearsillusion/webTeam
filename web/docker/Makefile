build-image:
	DOCKER_BUILDKIT=1 docker build --progress=plain -t web-team-pre -f $(ROOT_PATH)/docker/Dockerfile-pre.buildkit $(ROOT_PATH)
	DOCKER_BUILDKIT=1 docker build --progress=plain -t web-team:latest -f $(ROOT_PATH)/docker/Dockerfile.buildkit $(ROOT_PATH)
