const tracer = require('dd-trace');
const { version } = require('../package.json');

const enableDataDog = process.env.ENABLE_DATADOG || 'true';

if (enableDataDog === 'true') {
    tracer.init({
        logInjection: true,
        profiling: true,
        env: 'prod',
        service: 'api',
        version,
    });
    tracer.use('http', {
        blocklist: ['/health'],
        headers: ['device-os', 'accept-version', 'build-number'],
        splitByDomain: true,
    });
    tracer.use('express', {
        headers: ['device-os', 'accept-version', 'build-number'],
    });
}

module.exports = { tracer };
