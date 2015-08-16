function get(url) {
    return new A(function (resolve, reject) {
        var resp = $.ajax(url);
        console.log('check first', resp,resp.status);
        if(resp) {
            resolve(resp);
        } else {
            reject(resp);
        }
    });
}
get('jsons/db.json').then(function (res) {
    console.log('check-then-res', res);
    var obj = JSON.parse(res);
    console.log(obj);
}).then(null, function (error) {
    console.log('check-then-error', error);
});

