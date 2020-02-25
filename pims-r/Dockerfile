ARG BASE_CONTAINER=callysto/pims-minimal
FROM $BASE_CONTAINER

LABEL maintainer="Ian Allison <iana@pims.math.ca>"

# Configure environment
ENV NB_USER=jovyan
ENV HOME=/home/$NB_USER
USER $NB_USER
WORKDIR $HOME

# R
RUN conda install --quiet --yes \
    'gxx_linux-64' \
    'gmp' \
    'mpfr' \
    'r-base=3.6*' \
    'r-essentials=3.6*' \
    'r-gmp' \
    'r-irkernel=1.1*' \
    'r-plyr=1.8*' \
    'r-devtools=2.2*' \
    'r-dplyr=0.8*' \
    'r-ggplot2=3.2*' \
    'r-ggally=1.4*' \
    'r-hmisc=4.2*' \
    'r-tidyr=1.0*' \
    'r-lsmeans' \
    'r-shiny=1.4*' \
    'r-rmarkdown=2.1*' \
    'r-forecast=8.11*' \
    'r-stringr=1.4*' \
    'r-stringi=1.4*' \
    'r-rsqlite=2.1*' \
    'r-reshape2=1.4*' \
    'r-nycflights13=1.0*' \
    'r-car=3.0*' \
    'r-caret=6.0*' \
    'r-rcurl=1.98*' \
    'r-crayon=1.3*' \
    'r-testthat=2.3*' \
    'r-tidyverse=1.3*' \
    'r-randomforest=4.6*' && conda clean --all -f -y

COPY Rprofile.site /opt/conda/lib/R/etc/Rprofile.site

USER jupyter
# Configure environment
ENV NB_USER=jupyter \
    NB_UID=9999
ENV HOME=/home/$NB_USER
WORKDIR $HOME
