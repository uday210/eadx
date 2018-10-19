({
	doInit: function(component, event, helper) {
        
    	//console.warn('dashboardTabController.doInit');    
        
        var dashboardId = component.get('v.pageReference.state.dashboardId');
        var pageName = component.get('v.pageReference.state.pageName');

        if (dashboardId === null || typeof dashboardId === 'undefined') {

			dashboardId = component.get('v.dashboardId');
	        //console.warn('dashboardId: ', dashboardId);

	        if (dashboardId !== null || typeof dashboardId !== 'undefined') {

                var search = window.location.search;
                search = search.replace(new RegExp('\\?', 'g'), '');
                var tokens = search.split('&');
                var map = {};
                var kv = null;
                tokens.forEach(function(token) {
                    kv = token.split('=');
                    console.warn('kv: ', kv[0], kv[1]);
                    if (kv && kv.length > 0 && kv[0] && kv[0] !== '') {
                        if (kv[0] === 'dashboardId') {
                            kv[0] = dashboardId;
                        }
                        if (kv[0] === 'pageName') {
                            kv[0] = pageName;
                        }
	                    map[kv[0]] = kv[1];
                    }
                });
                //console.warn('map: ', map);
                if (map['dashboardId'] === null || typeof map['dashboardId'] === 'undefined') {
                    map['dashboardId'] = dashboardId;
                }
                if (map['pageName'] === null || typeof map['pageName'] === 'undefined') {
                    map['pageName'] = pageName;
                }
                search = '';
                var sep = '';
                for (var key in map) {
                    search += sep + key + '=' + map[key];
                    sep = '&';
                }
                //console.warn('search: ', search);
                
				//window.location.search = search;                

            }
        }

        
        //console.warn('dashboardId: ', dashboardId);
        helper.showDashboard(component, dashboardId, null, pageName, null);
        
        /*
        var workspaceAPI = component.find("workspace");
        
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            component.set("v.tabId", response.tabId);
			workspaceAPI.getTabURL({
                tabId: focusedTabId
            }).then(function(response) {
                console.warn('tab URL: ', response);
            });
            workspaceAPI.setTabLabel({
                tabId: focusedTabId,
                label: "Analytics Dashboards"
            });
            workspaceAPI.setTabIcon({
                tabId: focusedTabId,
                icon: "utility:salesforce1",
                iconAlt: "Analytics Dashboards"
            });            
        })
        .catch(function(error) {
            console.log(error);
        });
        */
    },
    
    showDashboard: function(component, event, helper) {
        
        var dashboardId = component.get('v.pageReference.state.dashboardId');
        var pageName = component.get('v.pageReference.state.pageName');
        helper.showDashboard(component, dashboardId, null, null);

		return;
        
        var params = event.getParams();
        var dashboardId = params.dashboardId;
        var developerName = params.developerName;
        var pageName = params.pageName;
        var tabId = params.dashboardId;
        //component.set("v.dashboardId", dashboardId);
        //component.set("v.developerName", developerName);
        /*
        console.warn('dashboardId: ', dashboardId);
        console.warn('developerName: ', developerName);
        console.warn('pageName: ', pageName);
        console.warn('tabId: ', tabId);
        */
        helper.showDashboard(component, dashboardId, developerName, pageName, tabId);
	},
    
    onTabCreated: function(component, event, helper) {
		//console.warn('onTabCreated');        
    },

    onTabFocused: function(component, event, helper) {
		//console.warn('onTabFocused');
    },

    onTabRefreshed: function(component, event, helper) {
		//console.warn('onTabRefreshed');
    },

    onTabUpdated: function(component, event, helper) {
		//console.warn('onTabUpdated');
    }
    
})