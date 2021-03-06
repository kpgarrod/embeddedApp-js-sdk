function testCompleted(done){
	$("#TestStatus").text("Test Completed");
	done();
}
var TestSpec={
	recordID:undefined,
	userID:undefined,
	customViewID:undefined,
	layoutID:undefined,
	relatedID:undefined,
	onLoadData:undefined,
	recordData : {
	        "Company": "Zylker",
	        "Last_Name": "Peterson",	
	        "Annual_Revenue":"500",
	        "Description":"Populating test data",
	        "Phone":"85663655785"
	  },
	orgVariable1:{key:"automationextension.PluginName",value:"AutomationExtension"},
	orgVariable2:{key:"automationextension.PluginPurpose",value:"QATesting"},
	url: "http://mockbin.org/bin/9b6c1e8a-ebf8-4fc8-a729-46175eb2c05c",
	connector:"unittest0.unittest.getfiles",
	fileId : "0B-EvY2Wt1MdxM1NxQjRxcG9GbXc",
	connectorFile : "unittest0.unittest.getfile"
};
const TestCases ={
		
};

TestCases.getMultipleRecord = function(module,recordIDs,callBack)
{
		ZOHO.CRM.API.getRecord({Entity:module,RecordID:recordIDs})
			.then(function(response)
			{
				if(response && typeof(response) === 'object' && response.data instanceof Array  && response.info instanceof Object && response.data.length === recordIDs.length)
				{
					callBack(true);
				}
				else
				{
					callBack(false);
				}
			})
};


TestCases.getAllRecord = function(callBack)
{
		ZOHO.CRM.API.getAllRecords({Entity:"Leads"})
			.then(function(data){
				if(data && typeof(data) === 'object' && data.data instanceof Array  && data.info instanceof Object)
				{
					callBack(true);
				}
				else
				{
					callBack(false);
				}
			})
};
TestCases.insertRecord=function(module,recordData,callBack)
{
			ZOHO.CRM.API.insertRecord({Entity:module,APIData:recordData})
			.then(function(data){
				if(data && typeof(data) === 'object' && data.data && data.data instanceof Array && data.data.length > 0 && data.data[0].code==='SUCCESS'){
					var recordData = data.data[0];
					leadID = recordData.details.id;
					callBack(true,leadID);
				}
				else
				{
					callBack(false);
				}
			})
};
TestCases.deleteRecord=function(module,recordID,callBack){
		  if(!recordID){
				callBack(false);
		  }
		  else{

			  ZOHO.CRM.API.deleteRecord({Entity:module,RecordID: recordID})
				.then(function(data){
					if(data && typeof(data) === 'object' && data.data && data.data instanceof Array && data.data.length > 0 && data.data[0].code==='SUCCESS'){
						callBack(true);
					}
					else
					{
						callBack(false);
					}
				})	
		  }
		  
};
TestCases.verifyRecord = function(module,recordID,recordData,callBack){
		  if(!recordID){
				callBack(false);
		  }
		  else{
		  	ZOHO.CRM.API.getRecord({Entity:module,RecordID:recordID})
			.then(function(data){
				if(data && data.data && data.data instanceof Array && data.data.length > 0 )
				{
					var recordData = data.data[0];
					for(field in recordData){

						if(recordData[field] == recordData[field]){
							continue
						}
						callBack(false);			
					}
					callBack(true);
				}
				else{
						callBack(false);
				}

			})
		  }
};
TestCases.getRecord = function(module,recordID,callBack){
	  if(!recordID){
			callBack(false);
	  }
	  else{
	  	ZOHO.CRM.API.getRecord({Entity:module,RecordID:recordID})
		.then(function(data){
			if(data && data.data && data.data instanceof Array && data.data.length > 0 )
			{
				callBack(true);
			}
			else{
					callBack(false);
			}
		})
	  }
};
TestCases.validateForm = function(formData,callBack){
			if(formData && formData instanceof Object)
			{
				for(field in TestSpec.recordData)
				{
					if(TestSpec.recordData[field] == formData.Data[field]){
						continue
					}
					callBack( false );			
				}
				callBack( true );
			}
			else{
				callBack( false );
			}
};
TestCases.getUser = function(userID,callBack){
		  if(!userID)
		  {
		  	ZOHO.CRM.API.getAllUsers({Type:"AllUsers"})
				.then(function(data){

					if(data && data instanceof Object && data.users instanceof Array  && data.info instanceof Object && data.users instanceof Array && data.users.length >0){
						var userData = data.users[0];
						callBack(true,userData.id);
				    }
				    else{
				    	callBack(false);
				    }
				});
		  }
		  else
		  {
			ZOHO.CRM.API.getUser({ID:userID})
				.then(function(data){
					if(data && data instanceof Object && data.users instanceof Array  && data.users instanceof Array && data.users.length >0){
						callBack(true);
					}
					else
					{
						callBack(false);
					}
				})
		  }
};
TestCases.getOrgVariable = function(variable,callBack)
{
	ZOHO.CRM.API.getOrgVariable(variable.key).then(function(data){
		if(data && data.Success && data.Success.Content === variable.value)
		{
			callBack(true);
		}
		else
			{
				callBack(false);
			}
	});
}
TestCases.checkHttpRequest = function(url,callBack){
	var request ={
		url : url
	}
	
	ZOHO.CRM.HTTP.get(request).then(function(responseData)
	{
		var response = JSON.parse(responseData);
		if(response && response.foo && response.foo === "Hello Word")
		{
			callBack(true);
		}
		else
		{
			callBack(false)
		}
	});
	
}
TestCases.getFields = function(module,callBack){
	ZOHO.CRM.META.getFields({Entity:module}).then(function(result){
		if(result)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.getModules = function(module,callBack){
	ZOHO.CRM.META.getModules({Entity:module}).then(function(result){
		if(result)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.getAssignmentRules = function(module,callBack){
	ZOHO.CRM.META.getAssignmentRules({Entity:module}).then(function(data){
		if(data)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.getCurrentUser = function(callBack){
	ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
		if(data)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.getOrgInfo = function(callBack)
{
	ZOHO.CRM.CONFIG.getOrgInfo().then(function(data){
		if(data)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.Search = function(module,type,query,callBack){
	ZOHO.CRM.API.searchRecord({Entity:module,Type:type,Query:query})
	.then(function(data){
	    if(data)
	   	{
	   		callBack(true);
	   	}
	   	else
	   	{
	   		callBack(false);
	   	}
	})
}
TestCases.invokeUnAuthConnector = function(callBack){
	ZOHO.CRM.CONNECTOR.invokeAPI("UnAuthConnectorNameSpace",{})
	.then(function(data){
			callBack(false);
	})
	.catch(function(e){
		
		callBack(true);
	});
}
TestCases.invokeConnectorWithoutDynamic = function(apiname,data,callBack){
	ZOHO.CRM.CONNECTOR.invokeAPI(apiname,{})
	.then(function(data){
		if(data)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.invokeConnectorwithDynamic = function(apiname,data,callBack){
	ZOHO.CRM.CONNECTOR.invokeAPI(apiname,data)
	.then(function(data){
		if(data)
		{
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});
}
TestCases.getCustomViews = function(customViewId ,callBack){
	
	var reqData = {"Entity":"Leads"};
	if(customViewId){
		reqData.Id = customViewId;
	}
	ZOHO.CRM.META.getCustomViews(reqData)
	.then(function(data){
		if(data && data.categories && data.categories instanceof Array && data.custom_views && data.custom_views instanceof Array && data.custom_views.length > 0 && data.info)
		{
			TestSpec.customViewID = data.custom_views[0].id
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});	
}
TestCases.getLayout = function(layoutID ,callBack){
	
	var reqData = {"Entity":"Leads"};
	if(layoutID){
		reqData.Id = layoutID;
	}
	ZOHO.CRM.META.getLayouts(reqData)
	.then(function(data){
		if(data && data instanceof Object && data.layouts && data.layouts instanceof Array && data.layouts.length > 0)
		{
			TestSpec.layoutID = data.layouts[0].id
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});	
}
TestCases.getRelatedList = function(layoutID ,callBack)
{
	var reqData = {"Entity":"Leads"};
	if(layoutID){
		reqData.Id = layoutID;
	}
	ZOHO.CRM.META.getRelatedList(reqData)
	.then(function(data){
		if(data && data instanceof Object && data.related_lists && data.related_lists instanceof Array && data.related_lists.length > 0)
		{
			TestSpec.relatedID = data.related_lists[0].id
			callBack(true);
		}
		else
		{
			callBack(false);
		}
	});	
}


