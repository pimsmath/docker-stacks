ARG BASE_CONTAINER=callysto/scipy-notebook
FROM $BASE_CONTAINER

LABEL maintainer="Ian Allison <iana@pims.math.ca>"

RUN conda install --yes \
  altair \
  astropy \
  boto3 \
  beautifulsoup4 \
  cartopy \
  colorlover \
  cvxopt \
  descartes \
  folium \
  fuzzywuzzy \
  geos \
  geopandas \
  gfortran_linux-64 \
  gmp \
  gmaps \
  html5lib \
  imageio \
  jupyterlab-git \
  jupytext \
  lapack \
  markdown \
  mpfr \
  mpld3 \
  nbconvert \
  nbgitpuller \
  nbval \
  nltk \
  nodejs \
  openblas \
  pandas \
  plotly \
  pyqt \
  pysal \
  python-graphviz \
  rdflib \
  rise \
  scrapy \
  spacy \
  spacy-model-en_core_web_sm \
  spacy-model-en_core_web_md \
  spacy-model-en_core_web_lg \
  textblob \
  tqdm \
  vega \
  vega_datasets \
  lxml && \
  conda remove --quiet --yes --force qt pyqt && \
  conda clean --all -f -y

RUN conda install --yes -c ian.e.preston stats_can && \
  conda clean --all -f -y

COPY pip.conf /etc/pip.conf
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

RUN jupyter labextension install @jupyterlab/toc --no-build \
 && jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build \
 && jupyter labextension install plotlywidget --no-build \
 && jupyter labextension install jupyterlab-plotly --no-build \
 && jupyter lab build
RUN jupyter nbextension enable --py widgetsnbextension --sys-prefix

RUN mkdir -p /home/$NB_USER/.config/matplotlib \
  && echo "backend: Agg" >> /home/$NB_USER/.config/matplotlib/matplotlibrc

USER root

RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  dvipng \
  fonts-dejavu \
  python-dev \
  hdf5-tools \
  libhdf5-103 \
  libgmp-dev \
  libmpfr-dev \
  libzmq5 \
  libzmq5-dev \
  libssl-dev \
  less openssh-client zip \
  man git libxrender1 \
  pyqt5-dev-tools \
  gnupg procps tzdata vim && \
  apt-get clean && rm -rf /var/lib/apt/lists/* && ln -s /bin/tar /bin/gtar

ENV SHELL /bin/bash

COPY jupyter_notebook_config.py /etc/jupyter/jupyter_notebook_config.py

RUN useradd -m -s /bin/bash -N -u 9999 jupyter
USER jupyter
# Configure environment
ENV NB_USER=jupyter \
    NB_UID=9999
ENV XDG_CACHE_HOME=/home/$NB_USER/.cache/ \
    HOME=/home/$NB_USER
WORKDIR $HOME
