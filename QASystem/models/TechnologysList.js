module.exports = function(mongoose){
	
	var TechnologySchema = new mongoose.Schema({
		technology : { type : String },
		subtechnologys : [String ]

	});

	var QuestionBank = new mongoose.Schema({

		subtechnology : {type :String},
		questions     : [{
						question        : {type :String},
						answers         : [String],
						difficultylevel : {type : Number},
						conceptscore    : {type : Number},
						importancescore : {type : Number}
						}]
	});

	var technologyQueue = mongoose.model('technologyQueue', TechnologySchema);

	var questionbank = mongoose.model('questionbank', QuestionBank);

	var populateTech = function(callback){
		technologyQueue.find( {},function(err,docs){
			//console.log(docs);
			if (err) {
				callback(false);
			}
			else{
				callback(docs);
			}
		});
	}
	// write here to get question with specifics subtech
	var question = function(callback){
		//console.log(subtechnology);
		questionbank.find(function(err,docs){
			//console.log(docs);
			if (err) {
				callback(false);
			}
			else{
				callback(docs);
			}
		});
	}

	var questionInsert = function(que,ans,difflevel,conscore,impscore,callback){
		console.log(question);
		var ques = new questionbank({
			  subtechnology   : 'Corej',
			  questions :   [{
			  	  question        : que,
			      answers          : ans,
			      difficultylevel : difflevel,
			      conceptscore    : conscore,
		    	  importancescore : impscore
			  }],
		      
		});
		console.log(ques);
		ques.save();

		callback(true);
	}

	return {
		populateTech 	: populateTech,
		question 	 	: question,
		questionInsert	: questionInsert
	}

}