/* 
 3 tables
 1. List of all questions (QuestionBank)
 2. List of technologies and their subtechnology (TechnologySchema)
 3. List of all subtechnologies	(Subtechnologyies)

 All functions writen below are used for fetching data from mongoDb specifing their respective
 function name.

 NOTE : Don't forget to return function while writing a new one.
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

    var populateTech = function(callback) {
        console.log("TechnologyList.js::populateTech::");
       /* var tech = new technologyQueue({technology: "java", subtechnologys: "null_pointer"});
        tech.save();*/

        technologyQueue.find( {},function(err,docs){
            console.log(docs);
            if (err) {
                console.log("TechnologyList.js::populateTech::err::"+ err);
                callback(false);
            }
            else{
                console.log("TechnologyList.js::populateTech::docs::" + docs);
                if(docs != undefined && docs.length == 0) {
                    console.log("TechnologyList.js::populateTech::docsIsEmpty");
                }
                callback(docs);
            }
        });
    }

    // write here to get question with specifics subtech
    var question = function(callback) {
        console.log("TechnologyList.js::question::");
        questionbank.find(function(err,docs) {
            console.log("TechnologyList.js::question::questionbank::");
            if (err) {
                console.log("TechnologyList.js::question::questionbank::err::" + err);
                callback(false);
            }
            else {
                console.log("TechnologyList.js::question::questionbank::docs::" + docs);
                callback(docs);
            }
        });
    }

    var questionInsert = function(subtech,que,ans,difflevel,conscore,impscore,callback) {
        console.log("TechnologysList.js::questionInsert");
        console.log("::" + subtech[0] + "::" + que + "::" + ans + "::" + difflevel + "::" + conscore + "::" + impscore);
        for(var i = 0 ; i<subtech.length; i++){
            var ques = new questionbank({
                subtechnology   : subtech[i],
                question        : que,
                answers         : ans,
                difficultylevel : difflevel,
                conceptscore    : conscore,
                importancescore : impscore
            });
            ques.save(function (err) {
                console.log("TechnologysList.js::questionInsert::err::" + err);
            });
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
        findQuesBySubtech	: findQuesBySubtech,
        getSubtechnologies 	: getSubtechnologies
    }

}