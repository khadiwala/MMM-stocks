var http = require("http");
var request = require('request');

var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
    get_stock_data: function(symbols, callback) {
            var options = {
                method: 'GET',
                url: 'http://download.finance.yahoo.com/d/quotes.csv?s=' + symbols.join() + '&f=l1p2'
            }

            request(options, function (error, response, body) {
                if (error) {
                    console.log(response + ": " + error);
                } else {
                    var rows = body.trim().split("\n");
                    var data = [];
                    for (var row in rows) {
                        var entries = rows[row].split(",");
                        var changeStr = entries[1].replace(/"/g, '');
                        data.push({
                            symbol: symbols[row],
                            price: entries[0],
                            change: changeStr.slice(1),
                            direction: changeStr[0] == "+"
                        });
                    }
                    callback(data);
                }
            });
    },

    socketNotificationReceived: function(notification, payload) {
        const self = this;
        this.get_stock_data(payload["symbols"], function(data) {
            self.sendSocketNotification("RES", data);
        });
    }
});
