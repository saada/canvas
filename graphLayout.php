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
		// $.each(JSON.parse(jsonstring), function(k, v){
  //           var o = new Option();
  //           var newTitle =decodeURIComponent(v.title);
  //           $(o).html(newTitle).val(v.id);
  //           $("select").append(o); 
  //       });
	});
</script>