const express = require('express');

const app = express();

const port = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`)
});

const COMMOM = require('./COMMOM');

const uri = COMMOM.uri;

const mongoose = require('mongoose');

const fashionModel = require('./fashionModel');


//API dành cho mobile
const apiMobile = require('./api');
app.use('/api', apiMobile);

///Kết nối CSDL vs mongo
app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let fashions = await fashionModel.find();

    console.log(fashions);

    res.send(fashions);
})

///Thêm xe mới
app.post('/add_sanpham', async (req, res) => {
    await mongoose.connect(uri);

    // let car = {
    //     ten: 'xe 3',
    //     namSX: 2024,
    //     hang: 'Mitsubishi',
    //     gia: 7500
    // }

    let fashion = req.body;

    console.log(fashion)

    let kq = await fashionModel.create(fashion);
    console.log(kq);

    let fashions = await fashionModel.find();

    res.send(fashions);
})

app.get('/xoa/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    console.log(id);

    //Xử lý lỗi khi id không đúng
    await fashionModel.deleteOne({_id:id});

    res.redirect('../')
})

// app.get('/update/:ten', async (req, res) => {
//     await mongoose.connect(uri);

//     console.log('Kết nối DB thành công');

//     let tenSanPham = req.params.ten;
//     console.log(tenSanPham);

//     let tenSanPhamMoi = tenSanPham + 'Mới ra mắt';

//     await fashionModel.updateOne({ten: tenSanPham}, {ten: tenSanPhamMoi});

//     let fashions = await fashionModel.find({});

//     res.send(fashions);
// })

app.get('/update/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    console.log(id);

    //Xử lý lỗi khi id không đúng
    await fashionModel.updateOne({_id:id});

    res.redirect('../')
})