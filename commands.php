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
		echo json_encode($result);
		return $result;
	}

	if(isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
	    $action = $_REQUEST['action'];
	    switch($action) {
	        case 'addGraph' :
	        {
	        	if(isset($_REQUEST['name']) && !empty($_REQUEST['name'])
	        		&& isset($_REQUEST['xml']) && !empty($_REQUEST['xml']))
        		{
        			if(addGraph($_REQUEST['name'],$_REQUEST['xml']) != null)
        				return true;
        		}
	        	break;
	        }
	    }
	}
	return false;
?>