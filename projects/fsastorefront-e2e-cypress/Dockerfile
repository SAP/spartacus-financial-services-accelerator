FROM cypress/browsers:node12.6.0-chrome75

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
ARG CYPRESS_VERSION="3.4.1"

RUN npm config -g set user $(whoami)
RUN npm install -g "cypress@${CYPRESS_VERSION}"
RUN npm install -g typescript
RUN npm link typescript
RUN npm install -D ts-loader
RUN npm install --save-dev webpack
RUN npm install --save-dev @cypress/webpack-preprocessor
RUN npm install --save-dev @testing-library/cypress
RUN npm link webpack
RUN cypress verify

# Cypress cache and installed version
RUN cypress cache path
RUN cypress cache list

ENTRYPOINT ["cypress", "run"]
