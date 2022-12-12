// var request = require('request');
const axios = require('axios');
const callAPI= async(method,url,body) => {

    const options = {
        'method': method,
        'url': url,
        'headers': {
          'Content-Type': 'application/json'
        },
        data: body
      };

      try {
        const result = await axios(options);
        console.log(result);
      } catch (e) {
           console.log(e);
      }
    //   process.exit(0);

    

}

module.exports = {callAPI}

