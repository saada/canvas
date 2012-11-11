<?php 
	//Require the ActiveRecord class
	require_once 'ActiveRecord/php-activerecord/ActiveRecord.php';
	
	//Set the database configuration and connection
	include('ActiveRecord/Configuration.php');
	
	//Include models
	include('ActiveRecord/models/GraphModel.php');

	function arToJson($data, $options = null) {
		$out = "[";
		foreach( $data as $row) { 
			if ($options != null)
				$out .= $row->to_json($options);
			else 
				$out .= $row->to_json();
			$out .= ",";
		}
		$out = rtrim($out, ',');
		$out .= "]";
		return $out;
	}

	function addGraph($name, $xml)
	{	
		$result = Graph::create(array('name'=>$name,'content'=>$xml));
		return $result->to_json(array(
   			'except' => array('create_time','update_time')));
	}

	function getGraph($name)
	{	
		$result = Graph::find_by_name($name);
		return $result->to_json(array(
   			'except' => array('create_time','update_time')));
	}

	function getGraphById($gid)
	{	
		$result = Graph::find_by_gid($gid);
		return $result->to_json(array(
   			'except' => array('create_time','update_time')));
	}

	function getAllGraphs()
	{	
		return arToJson(Graph::all(),
			array('except' => array('create_time','update_time')));
	}


	if(isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
	    $action = $_REQUEST['action'];
	    switch($action) {

	        case 'addGraph' :
	        {
	        	if(isset($_REQUEST['name']) && !empty($_REQUEST['name'])
	        		&& isset($_REQUEST['xml']) && !empty($_REQUEST['xml']))
        		{
        			$returnValue = addGraph($_REQUEST['name'],$_REQUEST['xml']);
        			if($returnValue != null)
        			{
        				echo $returnValue;
        				exit;
        			}
        		}
	        	break;
	        }

	        case 'getGraph' :
	        {
	        	if(isset($_REQUEST['name']) && !empty($_REQUEST['name']))
        		{
        			$returnValue = getGraph($_REQUEST['name']);
        			if($returnValue != null)
        			{
        				echo $returnValue;
        				exit;
        			}
        		}
	        	break;
	        }

	        case 'getGraphById' :
	        {
	        	if(isset($_REQUEST['gid']) && !empty($_REQUEST['gid']))
        		{
        			$returnValue = getGraphById($_REQUEST['gid']);
        			if($returnValue != null)
        			{
        				echo $returnValue;
        				exit;
        			}
        		}
	        	break;
	        }

	        case 'getAllGraphs' :
	        {
    			$returnValue = getAllGraphs();
    			if($returnValue != null)
    			{
    				echo $returnValue;
    				exit;
    			}
	        	break;
	        }
	    }
	}
	return false;
?>