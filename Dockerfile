FROM node:9
LABEL maintainer="Huan LI <zixia@zixia.net>"

ENV DEBIAN_FRONTEND     noninteractive
ENV WECHATY_DOCKER      1
ENV LC_ALL              C.UTF-8
ENV NODE_ENV            $NODE_ENV
ENV NPM_CONFIG_LOGLEVEL warn

# Installing the 'apt-utils' package gets rid of the 'debconf: delaying package configuration, since apt-utils is not installed'
# error message when installing any other package with the apt-get package manager.
# https://peteris.rocks/blog/quiet-and-unattended-installation-with-apt-get/
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils \
    bash \
    build-essential \
    ca-certificates \
    curl \
    coreutils \
    figlet \
    git \
    jq \
    libav-tools \
    libgconf-2-4 \
    moreutils \
    shellcheck \
    sudo \
    ttf-freefont \
    tzdata \
    vim \
    wget \
  && apt-get purge --auto-remove \
  && rm -rf /tmp/* /var/lib/apt/lists/*


# for https
# RUN apt-get install -yyq ca-certificates
# # install libraries
# RUN apt-get install -yyq libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
# # tools
# RUN apt-get install -yyq gconf-service lsb-release wget xdg-utils
# # and fonts
# RUN apt-get install -yyq fonts-liberation

# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
# https://github.com/ebidel/try-puppeteer/blob/master/backend/Dockerfile
# Install latest chrome dev package.
# Note: this also installs the necessary libs so we don't need the previous RUN command.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update && apt-get install -y --no-install-recommends \
#       google-chrome-unstable \
#     && apt-get purge --auto-remove \
#     && rm -rf /tmp/* /var/lib/apt/lists/* \
#     && rm -rf /usr/bin/google-chrome* /opt/google/chrome-unstable

# COPY google-chrome-stable_current_amd64.deb /tmp/google-chrome-stable_current_amd64.deb

# RUN dpkg -i /tmp/google-chrome-stable_current_amd64.deb
# RUN apt -y --fix-broken install && dpkg -i google-chrome-stable_current_amd64

# RUN rm /tmp/google-chrome-stable_current_amd64.deb

WORKDIR /app

