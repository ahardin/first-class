<script lang="ts">
	// set initial values for the variables representing the math problem
	let number1: number = 2;
	let number2: number = 3;
	let answer: number | string = '';
	let operators = ['+', '-', '*', '/'];
	let operator: string = '';

	// set initial values for the variables representing the game state
	let isCorrect: boolean | null = null;
	let score: number = 0;
	let timeLeft: number = 30;
	let gameActive: boolean = false;

	function startGame() {
		score = 0;
		timeLeft = 30;
		gameActive = true;
		generateNewQuestion();

		// start up a timer using setInterval
		// the funny looking arrow is a function
		// it will run every 1000 milliseconds (1 second)
		const timer = setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				clearInterval(timer);
				gameActive = false;
			}
		}, 1000); // 1000 milliseconds = 1 second
	}

	function checkAnswer() {
		// calculate the real answer based on the operator
		let realAnswer: number = 0;

		if (operator === '+') {
			realAnswer = number1 + number2;
		}

		if (realAnswer === Number(answer)) {
			isCorrect = true;
			score++;
			generateNewQuestion();
		} else {
			isCorrect = false;
		}
		
		answer = '';
	}

	function generateNewQuestion() {
		number1 = Math.floor(Math.random() * 10) + 1;
		number2 = Math.floor(Math.random() * 10) + 1;
		operator = '+';
	}

	// hmmm, maybe we should use this function?
	function pickOperator() {
		return operators[Math.floor(Math.random() * operators.length)];
	}
</script>

<div class="space-y-4 w-full md:max-w-96 mx-auto">
	<h2>Math Challenge!</h2>
	<p>You have 30 seconds to answer as many questions as possible.</p>

	<p>Winner gets unlimited respect.</p>

	{#if !gameActive}
		<button class="btn btn-primary" on:click={startGame}>Start Game</button>
	{:else}
		<div class="text-center">
			<p>Score: {score} | Time Left: {timeLeft}s</p>
			{number1} + {number2} = __
		</div>

		<div>
			<input
				class="input input-bordered"
				type="number"
				bind:value={answer}
				on:keypress={(e) => e.key === 'Enter' && checkAnswer()}
			/>
		</div>

		<div>
			<button class="btn btn-secondary" on:click={checkAnswer}>Check</button>
		</div>

		<p class="text-success">Nice job, you got it right!</p>

		<p class="text-error">Oops! Try again!</p>
	{/if}
</div>
