const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const { email } = JSON.parse(event.body);

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATA_CENTER = process.env.MAILCHIMP_DATA_CENTER;

    const url = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/`;
    const data = {
        email_address: email,
        status: "subscribed"
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `apikey ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Successfully subscribed!" })
        };
    } else {
        return {
            statusCode: response.status,
            body: JSON.stringify({ error: "Subscription failed." })
        };
    }
};
