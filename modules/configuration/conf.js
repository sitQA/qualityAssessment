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
        sitQAQueue: {
            doc: "name opf the amqp channel where situations with quality annotations should be published",
            fomrat: String,
            default: "situations.qa",
            env: "AMQP_SIT_QA_QUEUE"
        }
    }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

// Perform validation
conf.validate({strict: true});

module.exports = conf;