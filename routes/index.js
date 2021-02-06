const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {
//passport提供isAuthenticated()進行身分驗證
//檢查使用者是否有登入
const authenticated = (req, res, next) => {
  if ( req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}
//檢查使用者是否有登入且是否為後台管理員
const authenticatedAdmin = (req, res, next) => {
  if ( req.isAuthenticated()) {
    if (req.user.isAdmin) { return next() }
    return res.redirect('/')
  }
  res.redirect('/signin')
}

 //前台入口
 //使用者訪問首頁/，就導向 /restaurants 的頁面
 app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
//在 /restaurants 底下則交給 restController.getRestaurants 來處理
 app.get('/restaurants', authenticated, restController.getRestaurants)

 //後台入口
 //連到 /admin 頁面就轉到 /admin/restaurants
 app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
 // 在 /admin/restaurants 底下則交給 adminController.getRestaurants 處理
 app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
 app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
 app.post('/admin/restaurants', authenticatedAdmin, adminController.postRestaurant)

 //註冊頁面
 app.get('/signup', userController.signUpPage)
 app.post('/signup', userController.singUp)

 //登入頁面
 app.get('/signin', userController.signInPage)
 app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
 //登出頁面
 app.get('/logout', userController.logout)
}
