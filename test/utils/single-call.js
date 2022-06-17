const fetch = require('../../utils/fetch');

const baseurl = process.env.BASE_URL || 'http://localhost:8080';

const singleCall = async (timeWait) => {
    try {
        const response = await fetch(`${baseurl}/waitRequest?timeout=${timeWait}&startTime=${Date.now()}`).then((r) => r.json());
        return response;
    } catch (error) {
        console.log(JSON.stringify({
            message: 'single API call error',
            error,
        }));
    }
    return {};
};

module.exports = singleCall;
