<?php
	//display in order
	showWelcomeMessage();
	showGraph("100%","500");

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
		echo '<iframe id="myGraph" src="./canvas/graph.php" '
			.'width="'.$width.'" height="'.$height.'"></iframe>';
	}

	// Sample create command using ActiveRecord:
	// $graph = Graph::create(array('name'=>,'content'=>));
?>