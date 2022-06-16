const fetch = (...args) => import('node-fetch').then(({ default: nodeFetch }) => nodeFetch(...args));

module.exports = fetch;
