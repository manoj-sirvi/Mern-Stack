const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;


const jobs = require("./Users");

// Create Schema
const UserSchema = new Schema({
	usertype: {
		type: String,
		enum: ['applicant', "recuirtor"],
		required: true
	},
	name: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				//console.log((v.length != 0) && !(/\d/.test(v)));
				return (v.length != 0) && !(/\d/.test(v));
			}
		}
	},
	email: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: false,
	}
	,
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				//console.log(v.length)
				//console.log(v.length > 5 && v.length < 8)
				return v.length >= 5 && v.length <= 8
			}
		}


	},
	skill: [

	],
	education: [
		{
			institute_name: {
				type: String,
				"if": {
					"usertype": { "const": "applicant" }
				},
				"then":
				{
					required: true

				}, "else": {
					required: false
				}
			},
			startyear: {
				type: String,
				"if": {
					"usertype": { "const": "applicant" }
				},
				"then":
				{
					required: true,
					validate: {
						validator: function (v) {
							//
							console.log(v)
							v = Number(v)
							//	console.log((v > 1800 && v < 2021))
							return (v > 1800 && v < 2021)
						}
					}

				}, "else": {
					required: false
				}
				,
				// validate: {
				// 	validator: function (v) {
				// 		console.log(v)
				// 		v = Number(v)
				// 		console.log((v > 1800 && v < 2021))
				// 		return (v > 1800 && v < 2021)
				// 	}
				// }
			},
			endyear: {
				type: String,
				"if": {
					"usertype": { "const": "applicant" }
				},
				"then":
				{
					required: true,
					validate: {

						validator: function (v) {
							v = Number(v)
							return (v > 1800 && v < 2021) || v == 0
						}
					}

				}, "else": {
					required: false
				}
				// validate: {

				// 	validator: function (v) {
				// 		v = Number(v)
				// 		return (v > 1800 && v < 2021) || v == 0
				// 	}
				// }
			}
		}
	],
	bio: {
		type: String,
		required: false,
		validate: {
			validator: function (v) {
				v = v.replace(/(^\s*)|(\s*$)/gi, "");
				v = v.replace(/[ ]{2,}/gi, " ");
				v = v.replace(/\n /, "\n");
				var length = v.split(' ').length;
				if (length > 250)
					return false;
				else
					return true;
			}
		}
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	contact: {
		type: String,
		required: false,
		validate: {
			validator: function (v) {
				var phoneno = /^\d{10}$/;
				//console.log(phoneno.test(v) || v.length == 0)
				return phoneno.test(v) || v.length == 0

			}
		}

	}
	,
	job: [
		{
			Title: {
				type: String,
			},
			status: {
				type: String,
				enum: ['apply', 'applied', 'rejected', 'accepted'],
				default: 'apply'
			}
			,
			id: {
				type: String
			}, date: {
				type: Date
			},
			Rated: {
				type: Number,
				default: 0
			}
		}
	]
});

module.exports = User = mongoose.model("Users", UserSchema);
