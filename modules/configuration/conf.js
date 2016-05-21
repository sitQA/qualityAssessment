var convict = require('convict');

// Define a schema
var conf = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    amqp: {
        url: {
            doc: "The amqp connection URL for the AMQP broker to use.",
            format: String,
            default: "amqp://localhost",
            env: "AMQP_URL",
        },
        sitQueue: {
            doc: "name of the amqp queue where unannotated situations are published",
            format: String,
            default: "situations.raw",
            env: "AMQP_SIT_QUEUE"
        },
        sitExchange: {
            doc: "name opf the amqp exchange where situations with quality annotations should be published (pub/sub style)",
            format: String,
            default: "situations",
            env: "AMQP_SIT_EXCHANGE"
        }
    }
});

// Load environment dependent configuration
var env = conf.get('env');
try {
    conf.loadFile('./config/' + env + '.json');
} catch(e) {
    // no config file present, will use defaults
}


// Perform validation
conf.validate({strict: true});

module.exports = conf;