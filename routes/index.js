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

 //前台
 app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
 app.get('/restaurants', authenticated, restController.getRestaurants)

 //後台
 app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
 app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
 app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
 app.post('/admin/restaurants', authenticatedAdmin, adminController.postRestaurant)
 app.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
 app.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
 app.put('/admin/restaurants/:id', authenticatedAdmin, adminController.putRestaurant)
 app.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)

 //註冊頁面
 app.get('/signup', userController.signUpPage)
 app.post('/signup', userController.singUp)
 //登入頁面
 app.get('/signin', userController.signInPage)
 app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
 //登出頁面
 app.get('/logout', userController.logout)
}
