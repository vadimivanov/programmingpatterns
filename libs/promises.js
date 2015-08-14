function A(argument) {
    var state = 'pending';
    var value;
    var deferred = null;

    function resolve(result) {
        console.log('A-lib-newValue',result);
        try {
            if (result && typeof result.then === 'function') {
                result.then(resolve, reject);
                return;
            }
            state = 'resolved';
            value = result;

            if (deferred) {
                console.log('A-lib-deferred', deferred);
                handle(deferred);
            }
        } catch(e) {
            reject(e);
        }
    }

    function reject(error) {
        console.log('A-lib-reject',state, error);
        state = 'rejected';
        value = error;

        if (deferred) {
            handle(deferred);
        }
    }

    function handle(handler) {
        var current,
            handlerCallback;

        if (state === 'pending') {
            console.log('A-lib-handle-deferred',state, handler);
            deferred = handler;
            return;
        }

        if(state === 'resolved') {
            handlerCallback = handler.onResolved;
        } else {
            handlerCallback = handler.onRejected;
        }

//        if(!handlerCallback) {
//            if(state === 'resolved') {
//                handler.resolve(value);
//            } else {
//                handler.reject(value);
//            }
//
//            return;
//        }
        try {
            current = handlerCallback(value);
        } catch(e) {
            handler.reject(e);
        }
        handler.resolve(current);
        console.log('A-lib-handle',state, handler);
    }

    this.then = function (onResolved, onRejected) {
        console.log('A-lib-then', onResolved, onRejected);
        return new A(function (resolve, reject) {
            handle({
                onResolved: onResolved,
                onRejected: onRejected,
                resolve: resolve,
                reject: reject
            });
        });
    };

    argument(resolve, reject);
}