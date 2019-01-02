ARG BASE_CONTAINER=callysto/pims-minimal
FROM $BASE_CONTAINER

LABEL maintainer="Ian Allison <iana@pims.math.ca>"

USER root

RUN CUDA_DEB=https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.0.130-1_amd64.deb && \
  curl -LS --output /tmp/cuda.deb $CUDA_DEB && \
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 7fa2af80 && \
  apt-get install /tmp/cuda.deb && \
  apt-get update && \
  apt-get install -y --no-install-recommends cuda && \
  apt-get clean && \
  rm -rf /var/lib/opt/lists/* /tmp/cuda.deb

USER jupyter
# Configure environment
ENV NB_USER=jupyter \
    NB_UID=9999
ENV HOME=/home/$NB_USER

