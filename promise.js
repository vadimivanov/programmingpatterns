function get(url) {
    return new A(function (resolve, reject) {
        var resp = $.ajax(url);
        console.log('check first', resp);
        resolve(resp);
        reject(resp);
    });
}
get('jsons/db.json').then(function (res) {
    console.log('check-then-res', res);
});

