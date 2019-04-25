var fs = require('fs');

fs.readFile('dist/index.html', 'utf8', (err, data) => {

    if (!err) {
        var dataStr = data.toString(),
            timestamp = (new Date()).getTime();

        dataStr = dataStr
            .replace('app.js', 'app.js?v='+timestamp)
            .replace('<!-- dll -->', '<script src="./vendor.dll.js?v='+ timestamp +'"></script>')
            .replace('<script src=""></script>', '');

        fs.writeFile('./dist/index.html', dataStr, (error) => {
            if (!error) {
                console.log('HTML file copy successfully');
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(err);
    }
});
