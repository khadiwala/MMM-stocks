Module.register("stocks",{

    // Default module config.
    defaults: {
        symbols: ["AAPL", "GOOG"],
        fetchInterval: 300000
    },

    start : function() {
        this.loaded = false;
        this.stockInfo = [];
        this.sendSocketNotification("LOAD_STOCKS", {symbols: this.config.symbols});
        self = this;
        setInterval(function() {
            self.sendSocketNotification("LOAD_STOCKS", {symbols: self.config.symbols})
        }, this.config.fetchInterval);
    },

    socketNotificationReceived : function(notification, payload) {
        if (notification === "STOCK_RESULT") {
            this.stockInfo = payload
            this.loaded = true;
            this.updateDom(3000);
        }
    },

    getStyles: function() {
        return ["font-awesome.css"];
    },

    getDom: function() {

        if (!this.loaded) {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = "Loading stock data ...";
            // wrapper.className = "dimmed light small";
            return wrapper;
        }

        var table = document.createElement("table");
        table.className = "small";

        for (var i in this.stockInfo) {
            var f = this.stockInfo[i];
            var row = document.createElement("tr");
            table.appendChild(row);

            var symbolCell = document.createElement("td");
            symbolCell.className = 'symbol';
            symbolCell.innerHTML = f['symbol'];
            row.appendChild(symbolCell);

            var priceCell = document.createElement("td");
            priceCell.className = 'align-right';
            priceCell.innerHTML = f['price'];
            row.appendChild(priceCell);

            var changeCell = document.createElement("td");
            changeCell.className = 'align-right';
            changeCell.innerHTML = f['change'];
            row.appendChild(changeCell);

            var iconCell = document.createElement("td");
            iconCell.className = 'direction-icon';
            row.appendChild(iconCell);

            var icon = document.createElement("span");
            icon.className = "fa fa-" + (f['direction'] ? 'arrow-up' : 'arrow-down');
            iconCell.appendChild(icon);

        }

        return table;
    }
});

