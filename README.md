# Module: Stocks
This is a module for [MagicMirror². ](https://github.com/MichMich/MagicMirror/tree/v2-beta)

The `stocks` module displays the current price and percent change since open of a configurable list of stock symbols

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'stocks',
		position: 'top_left',
		config: {
            symbols : ['AAPL', 'GOOGL'] // choose your symbols
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>symbols</code></td>
			<td>A list of symbols to display stock information for <br>
				<br><b>Default value:</b> <code>['AAPL', 'GOOGL']</code>
			</td>
		</tr>
		<tr>
			<td><code>fetchInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)<br>
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>300000</code> (5 minutes)
			</td>
		</tr>
	</tbody>
</table>

