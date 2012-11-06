
<?php
	//display in order
	showWelcomeMessage();
	showGraph("100%","80%");

	function showWelcomeMessage(){
		global $user;
		if ($user->uid) {
			$greeting = 'Welcome '.format_username($user).' to the VLAB playground!';
		}
		else {
			$greeting = 'Welcome visitor to the VLAB playground!';
		}
		echo "<h1>".$greeting."</h1>";
	}

	function showGraph($width,$height){
		echo '<iframe id="myGraph" src="https://vlab.asu.edu/canvas/canvas/graph.php?lab_id=548" '
			.'width="'.$width.'" height="'.$height.'"></iframe>';
	}

	// Sample create command using ActiveRecord:
	// $graph = Graph::create(array('name'=>,'content'=>));
?>


<div id="graphMenu">
	<div class="row">
		<select id="graphList">
    	</select>​
	</div>
</div>

<script type="text/javascript">
	jQuery(document).ready(function(){
	});
</script>

<?php 
	//Require the ActiveRecord class
	require_once 'ActiveRecord/php-activerecord/ActiveRecord.php';
	
	//Set the database configuration and connection
	include('ActiveRecord/Configuration.php');
	
	//Include models
	include('ActiveRecord/models/GraphModel.php');

	function addGraph($name, $xml)
	{	
		$result = Graph::create(array('name'=>$name,'content'=>$xml));
		echo json_encode($result->gid);
		return $result->gid;
	}

	// print_r(addGraph("Jin", "Hui")->gid);
 ?>