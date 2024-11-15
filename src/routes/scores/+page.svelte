<script>
	import '../../app.css';

	export let data;

	const scores = data.scores;
</script>

<div class="container mx-auto prose">
	<h1>Scoreboard</h1>

	<table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
		{#each scores as score}
			<tr>
				<td>
					{score.name}
				</td>
				<td>
					{score.score}
				</td>
			</tr>
		{/each}
	</table>

	<div><a href="/">Back to Game</a></div>
</div>