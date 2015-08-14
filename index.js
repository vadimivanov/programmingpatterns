var Cars = extend();

function CarFactory(model, doors, color, saloon) {
    this.model = model;
    this.color = color;
    this.doors = doors;
    this.saloon = saloon;
}

CarFactory.prototype = {
    constructor: CarFactory,

    makeCar: function (params) {
        return new Cars[params.mark]({
            model: params.model || this.model,
            color: params.color || this.color,
            doors: params.doors || this.doors,
            saloon: params.saloon || this.saloon
        });
    }
};
var factory = new CarFactory("sedan", 2, "red", "leather");

factory.makeCar({mark: 'Ford', model: '5d'});
factory.makeCar({mark: 'Toyota', color: 'green'});
factory.makeCar({mark: 'Audi'});

function Factory () {
    this.constructors = {};
}

Factory.prototype.makeCar = function (name) {
    if (this.constructors.hasOwnProperty(name)){
        return new this.constructors[name]
    }
    throw new Error('there is no such car in our collection');
};

//Factory.prototype.constructors = {};

Factory.prototype.registerConstructor = function (name, fn) {
    this.constructors[name]= fn;
};

var Opel = function () {
    this.name = 'Opel'
};

var Ford = function () {
    this.name = 'Ford'
};

var models = {
    test : function () {

    },
    test2 : function () {

    }
};

var factoryInstance = new Factory();

factoryInstance.registerConstructor('ford', Ford);
factoryInstance.registerConstructor('opel', Opel);

var factoryInstance2 = new Factory();

for (var i in models){
    factoryInstance2.registerConstructor(i, models[i]);
}

