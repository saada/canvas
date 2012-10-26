<?php 
	
	if(isset($_POST['action']) && !empty($_POST['action'])) {
	    $action = $_POST['action'];
	    switch($action) {
	        case 'addGraph' :
	        {
	        	if(isset($_POST['name']) && !empty($_POST['name'])
	        		&& isset($_POST['xml']) && !empty($_POST['xml'])
        		{
        			if(addGraph($_POST['name'],$_POST['xml']) != null);
        				return true
        		}
	        	break;
	        }
	    }
	}
	else
	{
		return "Error: Could not execute your request!";
	}

	//Require the ActiveRecord class
	require_once 'ActiveRecord/php-activerecord/ActiveRecord.php';
	
	//Set the database configuration and connection
	include('ActiveRecord/Configuration.php');
	
	//Include models
	include('ActiveRecord/models/GraphModel.php');

	protected function addGraph(name, xml)
	{
		return Graph::create(array('name'=>,'content'=>));
	}
?>