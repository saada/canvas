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
	function loadGraphs(){
		jQuery.ajax({
			url: "/canvas/canvas/commands.php",
			type: "POST",
			data: {action : "getAllGraphs"},
			dataType: "json",
			success:function(result){
				console.log("===DEBUG=== loadGraphs()");
				console.log(result);

				//populate dropdownlist
				jQuery.each(result, function(k, v){
		            jQuery("#graphList").append(
		            	'<option value="'+v.gid+'">'+v.name+'</option>');
		        });
			},
			error:function(xhr,opt,e){
				alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
			}
		});
	}

	jQuery(document).ready(function(){
		loadGraphs();
	});
</script>