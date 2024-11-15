<script lang="ts">
	import { Fireworks, type FireworksOptions } from '@fireworks-js/svelte';
	import { saveScore } from './data';

	let fw: Fireworks;
	let options: FireworksOptions = {
		opacity: 0.5,
		intensity: 45
	};

	let showFireworks: boolean = false;

	function startFireworks() {
		showFireworks = true
	}

	// set initial values for the variables representing the math problem
	let number1: number = 2;
	let number2: number = 3;
	let answer: number | string = '';
	let operators = ['+', '-', '*'];
	let operator: string = '';

	// set initial values for the variables representing the game state
	let isCorrect: boolean | undefined;
	let score: number = 0;
	let timeLeft: number = 30;
	let gameActive: boolean = false;

	function startGame() {
		score = 0;
		timeLeft = 60;
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
				isGameOver = true;
			}
		}, 1000); // 1000 milliseconds = 1 second
	}

	function checkAnswer() {
		console.log('checkanswer1');

		// calculate the real answer based on the operator
		let realAnswer: number = 0;

		console.log(operator);

		if (operator === '-') {
			realAnswer = number1 - number2;
		}
		if (operator === '+') {
			realAnswer = number1 + number2;
		}
		if (operator === '*') {
			realAnswer = number1 * number2;
		}
		console.log('checkanswer2');

		if (realAnswer === Number(answer)) {
			console.log('correct');
			isCorrect = true;
			score++;
			startFireworks();
			generateNewQuestion();
		} else {
			console.log('incorrect');
			isCorrect = false;
		}

		answer = '';
	}

	function generateNewQuestion() {
		number1 = Math.floor(Math.random() * 10) - 1;
		number2 = Math.floor(Math.random() * 10) - 1;
		operator = pickOperator();
	}

	// hmmm, maybe we should use this function?
	function pickOperator() {
		return operators[Math.floor(Math.random() * operators.length)];
	}

	function hideSoon(element: HTMLElement) {
		setTimeout(() => {
			isCorrect = undefined;
		}, 2000);
	}

	let name: string = '';
	let isGameOver: boolean = false;
	
	async function save() {
		await saveScore('cherry', name, score);
		isGameOver = false;
	}
</script>

<Fireworks bind:this={fw} {options} class="fireworks" />

<div class="space-y-4 w-full md:max-w-96 mx-auto">
	<h2>Math Challenge!</h2>
	<p>You have 60 seconds to answer as many questions as possible.</p>

	<p>Winner gets free ice cream!!!!!!!</p>

	{#if !gameActive}
		<button class="btn btn-primary" on:click={startGame}>Start Game</button>
	{:else}
		<div class="text-center">
			<p>Score: {score} | Time Left: {timeLeft}s</p>
			{number1}
			{operator}
			{number2} = __
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

		{#if isCorrect !== undefined}
			{#if isCorrect === true}
				<p class="text-success" use:hideSoon>Nice Job, you got it right!!!!</p>
			{:else}
				<p class="text-error" use:hideSoon>Oops! Try again!!!!!!!!</p>
			{/if}
		{/if}
	{/if}

	{#if isGameOver}
		<div>
			<h3>Save your score!</h3>
			<input bind:value={name} class="input input-bordered" type="text" placeholder="Your name" />
			<button type="button" class="btn btn-primary" on:click={save}>Save</button>
		</div>
	{/if}

	<div><a href="/scores">View Scoreboard</a></div>
</div>