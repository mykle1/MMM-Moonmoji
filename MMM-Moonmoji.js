/* Magic Mirror
 * Module: MMM-Moonmoji
 *
 * By Mykle1
 * MIT License
 */
Module.register("MMM-Moonmoji", {

    // Module config defaults.
    defaults: {
        useHeader: false,    // true if you want a header      
        header: "",          // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 0,
        initialLoadDelay: 1250,
        retryDelay: 2500,
        updateInterval: 15 * 1000, // Every minute

    },

    getStyles: function() {
        return ["MMM-Moonmoji.css"];
    },

    getScripts: function() {
		
        return ["moment.js"];
    },

		
	start: function() {
        Log.info("Starting module: " + this.name);

        //  Set locale.
        this.Moji = {};
        this.scheduleUpdate();
    },
	

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("Loading . . .");
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("small", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var Moji = this.Moji;
		

        var top = document.createElement("div");
        top.classList.add("list-row");

		
		// code
        var code = document.createElement("div");
        code.classList.add("xsmall", "bright", "code");
        code.innerHTML = Moji.code;
        wrapper.appendChild(code);
		
		
		// emoji
        var emoji = document.createElement("div");
        emoji.classList.add("large", "bright", "emoji");
        emoji.innerHTML = Moji.emoji;
        wrapper.appendChild(emoji);
		
		
		// name
        var name = document.createElement("div");
        name.classList.add("xsmall", "bright", "name");
        name.innerHTML = Moji.name;
        wrapper.appendChild(name);
		
		
		// weight
        var weight = document.createElement("div");
        weight.classList.add("xsmall", "bright", "weight");
        weight.innerHTML = Moji.weight;
        wrapper.appendChild(weight);
		

        return wrapper;
		
    }, // closes getDom
    
    
    /////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_EMOJI') {
            this.hide();
        }  else if (notification === 'SHOW_EMOJI') {
            this.show(1000);
        }
            
    },


    processMoji: function(data) {
        this.Moji = data;
		console.log(this.Moji); // for checking
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getMoji();
        }, this.config.updateInterval);
        this.getMoji(this.config.initialLoadDelay);
    },

    getMoji: function() {
        this.sendSocketNotification('GET_MOJI');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "MOJI_RESULT") {
            this.processMoji(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
