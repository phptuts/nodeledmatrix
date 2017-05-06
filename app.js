
var express = require('express');
var path = require("path");
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {


    var matrixBoard = resetMatrix();

    var matrix = new five.Led.Matrix({
        pins: {
            data: 2,
            clock: 3,
            cs: 4
        }
    });

    function resetMatrix() {
        return [
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ],
            [
                false,false,false,false,false,false,false,false
            ]
        ];
    }
    var app = express();

    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/turn-on/:row/:col', function (req, res) {

        matrixBoard[req.params.row][req.params.col] =  !matrixBoard[req.params.row][req.params.col];
        var isOn = matrixBoard[req.params.row][req.params.col];
        matrix.led(parseInt(req.params.row), parseInt(req.params.col), isOn);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({row: req.params.row, col: req.params.col, isOn: isOn }));
    });

    app.get('/clear', function (req, res) {
        matrix.clear();
        matrixBoard = resetMatrix();
        res.send(JSON.stringify({'success': true}));
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });
});

