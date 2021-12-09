const coordinatesToAttack = require('./coordinates.js');
const { Router } = require('express');
const router = Router();


// POST
router.post('/radar', (req, res) => {
	res.json(coordinatesToAttack(req));
});


module.exports = router;