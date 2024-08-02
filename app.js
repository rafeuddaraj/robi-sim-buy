const axios = require('axios');

async function checkMsisdn() {
    const baseUrl = 'https://da-api.robi.com.bd/da-nll/free-msisdn/get-msisdn-list';
    const prefix = '8801601';
    const suffix = '101';
    const ranges = [
        [122, 199], [200, 299], [300, 399], [400, 499], [500, 599],
        [600, 699], [700, 799], [800, 899], [900, 999]
    ];

    for (const range of ranges) {
        for (let i = range[0]; i <= range[1]; i++) {
            const msisdn = `${prefix}${i}${suffix}`;
            const data = {
                msisdn: msisdn,
                brand: 'AIRTEL',
                simCategory: 'PREPAID'
            };

            console.log(`Requesting`, msisdn);

            try {
                const response = await axios.post(baseUrl, data);
                const responseData = response.data;

                if (responseData.status === 'SUCCESSFUL') {
                    const available = responseData.available;
                    if (available) {
                        console.log(`Match found: ${msisdn}`);
                        console.log("Data Here: ", responseData);

                        return msisdn;
                    }
                }
            } catch (error) {
                console.error(`Error for msisdn ${msisdn}:`, error.message);
            }
        }
    }

    console.log('No match found.');
    return null;
}

checkMsisdn();
