const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const routerWeb = require("./router/web.router");
const DBConnection = require("./database/DBConnect");
const lodash = require('lodash');

app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/', routerWeb);

DBConnection.connect(function (err) {
    if (err) throw err.stack;
    else console.log('connect database successfully')
});

// app.get('/list/:page', async (req, res) => {
//     let sum = '';
//     const sql1 = `select count(*) as sum from staffs`;
//     await DBConnection.query(sql1, async (err, result) => {
//         if (err) throw err.stack;
//         sum = result[0].sum;
//         let arr = [];
//         let perPage = 3;
//         console.log(typeof sum)
//         console.log(sum)
//         for (let i = 1; i <= Math.ceil(sum/perPage); i++) {
//             arr.push(i);
//         }
//         let newArr = lodash.chunk(arr, perPage);
//         console.log(newArr);
//         for (let i = 0; i < newArr.length; i++) {
//             for (let j = 0; j < newArr[i].length; j++) {
//                 if (+req.params.page === newArr[i][j]) {
//                     let page = req.params.page;
//                     let begin = (page - 1) * perPage;
//                     const sql = `SELECT * FROM staffs limit ${perPage} offset ${begin}`;
//                     console.log(sql)
//                     console.log(newArr[i])
//                     await DBConnection.query(sql, (err, result) => {
//                         if (err) throw err.stack;
//                         res.render('list', {employees: result, way: newArr[i]});
//                     })
//                 }
//             }
//         }
//     })
// })

app.listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000');
})