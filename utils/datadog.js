const tracer = require('dd-trace');

const enableDataDog = process.env.ENABLE_DATADOG || 'true';

if (enableDataDog === 'true') {
    tracer.init({ logInjection: true, profiling: true });
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
