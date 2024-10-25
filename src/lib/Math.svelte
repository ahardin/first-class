<script lang="ts">
	let number1: number = 2;
	let number2: number = 3;

	let answer = 0;

	function check() {
		const realAnswer = number1 + number2;

		if (realAnswer == answer) {
			isCorrect = true;
		} else {
			isCorrect = false;
		}
	}
</script>

<h2>Math Challenge!</h2>
<p>You have 30 seconds to answer as many questions as possible.</p>

<p>Winner gets unlimited respect.</p>

<div class="text-center">
	{number1} + {number2} = __
</div>

<div>
	<input class="input input-bordered" type="text" bind:value={answer} />
</div>

<div>
	<button class="btn btn-secondary" on:click={check}>Check</button>
</div>

{#if isCorrect}
	<p>Nice job, you got it right!</p>
{:else}
	<p>Totally wrong!</p>
{/if}
