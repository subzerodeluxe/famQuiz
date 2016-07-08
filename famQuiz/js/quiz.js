(function() {
	
	// declare angular app
	var app = angular.module('quiz', []);

	// declare controller + dependencies  
	app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

		$scope.score = 0; 
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('quiz_data.json').then(function(quizData){
			$scope.myQuestions = quizData.data; 
			$scope.totalQuestions = $scope.myQuestions.length; // get number of questions 	
		}); 
										// question index & answer index 
		$scope.selectAnswer = function(qIndex,aIndex) {

			var questionState = $scope.myQuestions[qIndex].questionState;

			if (questionState != 'answered') {
				$scope.myQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct; 
				// set correctAnswer to correct answer from JSON file 
				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

				if (aIndex === correctAnswer) {
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1; // plus 1 on score 
				} else {
					$scope.myQuestions[qIndex].correctness = 'incorrect'; 
				}
				// set value of questionState to answered (question is answered)
				$scope.myQuestions[qIndex].questionState = 'answered'; 
			}
			$scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(1); 
		}

		$scope.isSelected = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex; 
		}

		$scope.isCorrect = function(qIndex, aIndex) {
			return $scope.myQuestions[qIndex].correctAnswer === aIndex; 
		}

		$scope.selectContinue = function() {
			return $scope.activeQuestion += 1;
		}

		/*$scope.createShareLinks = function(percentage) {
			var url = 'http://bandvanfortuin.nl/famQuiz/index.html'; 

			var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored 
				a '+percentage+'% on this quiz about Saturn. Try to beat my score at '+url+'">Email een vriend</a>'; 

			var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a '+percentage+'% on this 
			quiz about Saturn. Try to beat my score at&amp;hashtags=SaturnQuiz&amp;url='+url+'">Tweet je score</a>';

			var newMarkup = emailLink + twitterLink;

			return $sce.trustAsHtml(newMarkup);
		}*/ 


	}]); 
})(); 