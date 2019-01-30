ARG BASE_CONTAINER=callysto/pims-minimal
FROM $BASE_CONTAINER

LABEL maintainer="Ian Allison <iana@pims.math.ca>"

USER root

RUN apt-get update && apt-get install -y \
  epstool \
  file \
  ghostscript \
  gnuplot-nox \
  liboctave-dev \
  octave \
  pstoedit \
  transfig \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY octaverc /usr/share/octave/site/m/startup/octaverc

# Configure our shared environment
# Switch over to 'jovyan'
ENV NB_USER=jovyan
ENV HOME=/home/$NB_USER

USER $NB_USER

RUN conda install --yes \
  beautifulsoup4 \
  html5lib \
  mpld3 \
  nltk \
  octave_kernel \
  && conda clean -tipsy

USER jupyter
# Configure environment
ENV NB_USER=jupyter \
    NB_UID=9999
ENV HOME=/home/$NB_USER
