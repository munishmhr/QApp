/* 
3 tables 
1. List of all questions (QuestionBank)
2. List of technologies and their subtechnology (TechnologySchema)
3. List of all subtechnologies	(Subtechnologyies)

All functions writen below are used for fetching data from mongoDb specifing their respective
function name.

NOTE : Dont forget to return function while writting a new one.
*/

module.exports = function(mongoose){
	
	var TechnologySchema = new mongoose.Schema({
		technology : { type : String },
		subtechnologys : [String ]

	});

	var Subtechnologyies = new mongoose.Schema({
		subtechnology 	: [String]
	});

	var QuestionBank = new mongoose.Schema({

		subtechnology 	: {type :String},
		question      	: {type :String},
		answers         : [String],
		difficultylevel : {type : Number},
		conceptscore    : {type : Number},
		importancescore : {type : Number}

	});

	var technologyQueue = mongoose.model('technologyQueue', TechnologySchema);

	var questionbank = mongoose.model('questionbank', QuestionBank);

	var subtechnologies = mongoose.model('subtechnologies', Subtechnologyies);

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

	var questionInsert = function(subtech,que,ans,difflevel,conscore,impscore,callback){
		for(var i = 0 ; i<subtech.length; i++){
			//console.log(subtech[i]);
			var ques = new questionbank({
				  subtechnology   : subtech[i],
				  question        : que,
				  answers         : ans,
				  difficultylevel : difflevel,
				  conceptscore    : conscore,
			      importancescore : impscore	      
			});
			ques.save();
		}
		callback(true);
	}

	var findQuesBySubtech = function(subtech,callback){
		questionbank.find({subtechnology:subtech},function(err,docs){
			if (err) {
				callback(false);
			}
			else{
				console.log(docs);
				callback(docs);
			}
		});
	}

	var getSubtechnologies = function(callback){
		subtechnologies.find(function(err,docs){
			if (err) {
				callback(false);
			}
			else{
				callback(docs);
			}
		});
	}

	return {
		populateTech 		: populateTech,
		question 	 		: question,
		questionInsert		: questionInsert,
		findQuesBySubtech	:findQuesBySubtech,
		getSubtechnologies 	: getSubtechnologies
	}

}