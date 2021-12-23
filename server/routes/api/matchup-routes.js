//This is just making sure we go to the right spot in our controllers. 

const router = require('express').Router();
const {
  getAllMatchups,
  createMatchup,
  getMatchup,
  createVote,
} = require('../../controllers/matchup-controller');

router.route('/').get(getAllMatchups);
router.route('/').post(createMatchup);
router.route('/:id').get(getMatchup);
router.route('/:id').put(createVote);

module.exports = router;
