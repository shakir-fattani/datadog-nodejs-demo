const fetch = require('../../utils/fetch');

const baseurl = process.env.BASE_URL || 'http://localhost:8080';

const singleCall = async (timeWait) => {
    try {
        const response = await fetch(`${baseurl}/waitRequest?timeout=${timeWait}`).then((r) => r.json());
        // console.log(response);
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
