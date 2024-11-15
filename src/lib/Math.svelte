<script lang="ts">
	import { Fireworks, type FireworksOptions } from '@fireworks-js/svelte';
	import { saveScore } from './data';

	let fw: Fireworks;
	let showFireworks = false;
	let options: FireworksOptions = {
		opacity: 0.5,
		intensity: 3
	};

	function startFireworks() {
		showFireworks = true;

		setTimeout(() => {
			showFireworks = false;
		}, 6500);
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
		timeLeft = 45;
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
		// calculate the real answer based on the operator
		let realAnswer: number = 0;

		if (operator === '+') {
			realAnswer = number1 + number2;
		}

		if (operator === '-') {
			realAnswer = number1 - number2;
		}

		if (operator === '*') {
			realAnswer = number1 * number2;
		}

		if (operator === '/') {
			realAnswer = number1 / number2;
		}

		if (realAnswer === Number(answer)) {
			isCorrect = true;
			score = score + 100;
			startFireworks();
			generateNewQuestion();
		} else {
			isCorrect = false;
		}

		answer = '';
	}

	function generateNewQuestion() {
		number1 = Math.floor(Math.random() * 10) + 1;
		number2 = Math.floor(Math.random() * 10) + 1;
		operator = pickOperator();
	}

	// hmmm, maybe we should use this function?
	function pickOperator() {
		return operators[Math.floor(Math.random() * operators.length)];
	}

	let name: string = '';
	let isGameOver: boolean = false;

	async function save() {
		await saveScore('blueberry', name, score);
		isGameOver = false;
	}
</script>

{#if showFireworks}
	<Fireworks bind:this={fw} {options} class="fireworks" />
{/if}
<div class="space-y-4 w-full md:max-w-96 mx-auto">
	<h2>ARE U StUpId?</h2>
	<p>find out now!</p>

	<p>by playing our game!</p>

	{#if !gameActive}
		<button class="btn btn-primary" on:click={startGame}>PuSH nOW</button>
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
			<button class="btn btn-secondary" on:click={checkAnswer}>spadoinkadoink check</button>
		</div>

		{#if isCorrect != undefined}
			{#if isCorrect}
				<p class="text-success">Dave</p>
			{:else}
				<p class="text-error">YOU ARE A IDIOT SANDWICH</p>
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

<style>
	:global(.fireworks) {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -1;
	}
</style>
