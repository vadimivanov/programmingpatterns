// todo naming
function extend() {
    var Cars = {
        Ford: function (param) {
            console.log("new Ford " + param.model + " with " + param.doors + " color " + param.color);
        },
        Toyota: function (param) {
            console.log("new Toyota " + param.model + " with " + param.doors + " color " + param.color);
        },
        Audi: function (param) {
            console.log("new Audi " + param.model + " with " + param.doors + " color " + param.color);
        }
    };
    return Cars;
}