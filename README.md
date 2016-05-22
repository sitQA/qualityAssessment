# Situation Quality Assessment for SitOpt

[![Build Status](https://travis-ci.org/sitQA/qualityAssessment.svg?branch=master)](https://travis-ci.org/sitQA/qualityAssessment)

Situations are basically complex events which are detected by aggregating context information from various sources.
The quality of a situation can be determined with different strategies
(e.g. using the minimum or average of underlying information qualities).

This is a Node.js based worker module which consumes situation messages as produced by the 
[SitOPT](https://www.ipvs.uni-stuttgart.de/abteilungen/as/forschung/projekte/SitOPT?__locale=en) 
situation recognition from an AMQP queue and annotates them with quality context information using the requested strategy.

Annotated situations are published via an AMQP exchange so that multiple subscribers can can consume annotated
situation messages.

## Installation
- install Node.js 4 or 5 (installation via [NVM](https://github.com/creationix/nvm) recommended)
- install [RabbitMQ](https://www.rabbitmq.com/)
- run `npm install`
- run `npm start` to start the quality assessment module

## Configuration
The module can be configured with environment variables or by providing a json file.
Different settings can be used for development and production mode by specifying configuration files.
The configuration file must be placed in `config/<environment>.json`, where environment is one of 
`development` (default), `production` or `test`.  
The application environment is loaded from the `NODE_ENV` variable.

See `modules/configuration/conf.js` for all available settings and used defaults.


## Testing
Make sure that RabbitMQ is running and run `npm test` to run the mocha tests.

