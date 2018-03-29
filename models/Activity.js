const mongoose = require('mongoose');
const { Schema } = mongoose;

const isValidUrl = require('../utils/isValidUrl');

const ActivitySchema = new Schema({
	activity: {
		type: String,
		required: true,
		enum: [
			'Basic Project',
			'Substantial Project',
			'Large Project',
			'Gigantic Project',
			'Book',
			'Tutorial Course',
			'University Level Course',
			'Physical Activity',
			'Musical Instrument Practice',
			'Khan Academy',
			'Analytics Vidhya Competition',
			'Crowd Analytix Competition',
			'Kaggle Competition',
			'Driven Data Competition',
			'Design Competition',
			'Blog Post',
			'Blog Post Tutorial',
			'Practice Writing Skills',
			'Video Tutorial',
			'Open Source PR',
			'Module to npm',
			'Team Up for a project',
			'Diary entry',
			'CodeWars',
			'CodinGame Tier',
			'CodinGame Bot Competition',
			'HackerRank',
			'Google Code Jam',
		],
	},
	points: {
		type: Number,
	},
	title: {
		type: String,
		required: true,
	},
	dateCompleted: {
		type: Date,
		default: Date.now(),
	},
	url: {
		type: String,
		validate: {
			validator: value => isValidUrl(value),
			message: '{VALUE} is not a valid URL',
		},
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

ActivitySchema.pre('save', function(next) {
	let action = this;

	switch (action.activity) {
		case 'Google Code Jam':
		case 'CodinGame Tier':
		case 'Team Up for a project':
		case 'Tutorial Course':
		case 'Basic Project':
			action.points = 100;
			break;
		case 'Substantial Project':
		case 'Book':
		case 'Module to npm':
			action.points = 200;
			break;
		case 'HackerRank':
		case 'CodeWars':
		case 'Open Source PR':
		case 'Video Tutorial':
		case 'Design Competition':
		case 'Analytics Vidhya Competition':
		case 'Crowd Analytix Competition':
		case 'Kaggle Competition':
		case 'Driven Data Competition':
			action.points = 50;
			break;
		case 'Physical Activity':
		case 'Musical Instrument Practice':
		case 'Khan Academy':
		case 'Practice Writing Skills':
			action.points = 10;
			break;
		case 'Large Project':
			action.points = 300;
			break;
		case 'Gigantic Project':
			action.points = 400;
			break;
		case 'Blog Post':
			action.points = 15;
			break;
		case 'Blog Post Tutorial':
			action.points = 40;
			break;
		case 'Diary entry':
			action.points = 5;
			break;
		case 'CodinGame Bot Competition':
			action.points = 20;
			break;
		default:
			break;
	}
	next();
});

mongoose.model('activity', ActivitySchema);
