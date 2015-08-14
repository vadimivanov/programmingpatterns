var PubSub = function () {
    this.data = {};
    this.listeners = [];
    this.isSubscribed = true;
};
PubSub.prototype = {
    constructor: PubSub,

    publish: function (channel, options, context) {
        this.data = {};
        this.data = options;
        this.dispatch('publish', channel, context);
    },

    subscribe: function (channel, listener) {
        if (this.listeners[channel] !== channel)this.listeners[channel] = [];
        this.listeners[channel].push(listener);
    },

    unsubscribe: function (channel, context) {
        this.dispatch('unsubscribe', channel, context);
    },

    dispatch: function (action, channel, context) {
        if (Object.prototype.toString.call(this.listeners[channel]) === '[object Array]') {
            for (var i = 0; i < this.listeners[channel].length; i++) {
                if (action == 'publish' && context == this.isSubscribed) {
                    this.listeners[channel][i](this.data);
                } else {
                    return false;
                }
            }
        }
    }
};

var Users = new PubSub();

Users.subscribe("chat", function (options) {
    $('.chat').append('User ' + options.user + ': '+ options.text + '</br>');
});

$('#addFirst').click(function () {
    var text = $('#first').val();
    Users.publish("chat", {text: text, user: 'first'}, true);
});
$('#addSecond').click(function () {
    var text = $('#second').val();
    Users.publish("chat", {text: text, user: 'second'}, true);
});