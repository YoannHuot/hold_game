let playerTurn;
let score = [];
let currentScore = 0;
let totalScoreP1 = 0;
let totalScoreP2 = 0;

/*
Define background color depending on current player 
*/
const playerOneTurn = () => {
	$(".player1").css("background-color", "#F3F0EF");
	$(".player2").css("background-color", "#FFFFFF");

	$(".currentPlayer1").removeClass("important bg-secondary");
	$(".currentPlayer1").addClass("important bg-primary");
	$(".currentPlayer2").removeClass("important bg-primary");
	$(".currentPlayer2").addClass("important bg-secondary");
};

const playerTwoTurn = () => {
	$(".player2").css("background-color", "#F3F0EF");
	$(".player1").css("background-color", "#FFFFFF");

	$(".currentPlayer2").removeClass("important bg-secondary");
	$(".currentPlayer2").addClass("important bg-primary");
	$(".currentPlayer1").removeClass("important bg-primary");
	$(".currentPlayer1").addClass("important bg-secondary");
};

/*
Dice behavior and current score calcul 
*/
const getRandomNumber = (min, max) => {
	const result = Math.floor(Math.random() * (max - min) + min);
	$(".roll img").attr("src", `src/pictures/Component${result}.svg`);
	if (result === 1) {
		$(`.countPlayer${playerTurn}`).text(0);
		currentPlayer(1, 2);
		currentScore = 0;
	} else {
		currentScore += result;
		$(`.countPlayer${playerTurn}`).text(currentScore);
	}
};

/*
Calcul and add total Score for each player 
*/
const holdScore = () => {
	if (playerTurn === 1) {
		totalScoreP1 += currentScore;
		$(`.totalPlayer${playerTurn}`).text(totalScoreP1);
	} else {
		totalScoreP2 += currentScore;
		$(`.totalPlayer${playerTurn}`).text(totalScoreP2);
	}
	$(`.countPlayer${playerTurn}`).text(0);
	endGame(totalScoreP1, totalScoreP2);

	currentScore = 0;
};

/*
Define the first player
*/
const firstPlayer = () => {
	if (Math.random() > 0.5) {
		playerTurn = 1;
		playerOneTurn();
	} else {
		playerTurn = 2;
		playerTwoTurn();
	}
	console.log("current player : " + playerTurn);
};

/*
Changer current player
*/
const currentPlayer = (p1, p2) => {
	if (playerTurn === p1) {
		playerTurn = p2;
		playerTwoTurn();
	} else if (playerTurn === p2) {
		playerTurn = p1;
		playerOneTurn();
	}
	console.log("current player : " + playerTurn);
};

/*
Reset score on click 
*/
const resetScore = () => {
	firstPlayer();
	$(".countPlayer1, .countPlayer2").text(0);
	$(".totalPlayer1, .totalPlayer2").text(0);
	$(".dice").text(1);
	currentScore = 0;
	totalScoreP1 = 0;
	totalScoreP2 = 0;
};

/*
End game function
*/
const endGame = (p1, p2) => {
	if (p1 >= 100) {
		alert("bravo joueur 1");
		resetScore();
	}
	if (p2 >= 100) {
		alert("bravo joueur 2");
		resetScore();
	}
};

firstPlayer();

/*
DOM EVENT
*/

$(".title").click(() => {
	resetScore();
});

$(".roll").click(() => {
	getRandomNumber(1, 7);
});

$(".hold").click(() => {
	holdScore();
	currentPlayer(1, 2);
});
