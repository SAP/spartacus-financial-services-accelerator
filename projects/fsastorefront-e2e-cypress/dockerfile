FROM cypress/included:8.3.0
ENV CI=1

RUN echo "whoami: $(whoami)"
RUN npm config -g set user $(whoami)
RUN npm install -g typescript
RUN npm link typescript
RUN npm install -D ts-loader
RUN npm link webpack
RUN cypress verify

RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"

ENTRYPOINT ["yarn", "cy:run:auto"]
