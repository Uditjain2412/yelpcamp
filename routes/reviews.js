const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');
const { isLoggedin, isReviewAuthor, validateReview } = require('../middleware');

router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
