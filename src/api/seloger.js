class SeLoger{

    get_list(){
        return new Promise((resolve, reject) => {
            const http = require("https");

            const options = {
                "method": "GET",
                "hostname": "seloger.p.rapidapi.com",
                "port": null,
                "path": "/properties/list?zipCodes=75&pageIndex=1&pageSize=50&realtyTypes=1&transactionType=1&sortBy=0&includeNewConstructions=true",
                "headers": {
                    "X-RapidAPI-Key": "57a2417533msh00e287652bdd252p16f883jsna34a5af342eb",
                    "X-RapidAPI-Host": "seloger.p.rapidapi.com",
                    "useQueryString": true
                }
            };

            const req = http.request(options, function (res) {
                const chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    const body = Buffer.concat(chunks);
                    resolve(
                        body.toString()
                    ) ;
                });
            });

            req.end();
        })
        
    }
}

module.exports = SeLoger