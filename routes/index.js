const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

module.exports = (app) => {

 //前台入口
 //使用者訪問首頁/，就導向 /restaurants 的頁面
 app.get('/', (req, res) => res.redirect('/restaurants'))
//在 /restaurants 底下則交給 restController.getRestaurants 來處理
 app.get('/restaurants', restController.getRestaurants)

 //後台入口
 // 連到 /admin 頁面就轉到 /admin/restaurants
 app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
 // 在 /admin/restaurants 底下則交給 adminController.getRestaurants 處理
 app.get('/admin/restaurants', adminController.getRestaurants)

 //註冊頁面
 app.get('/signup', userController.signUpPage)
 app.post('/signup', userController.singUp)
}
