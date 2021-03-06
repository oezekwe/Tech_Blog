const router= require('express').Router();

const api_R= require('./api');
const home_R= require('./homeRoutes');
const dashboard_R= require('./dashboardRoutes')

router.use('/', home_R);
router.use('/api', api_R);
router.use('/dashboard', dashboard_R)

module.exports = router;