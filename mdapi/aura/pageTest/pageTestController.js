({
    doInit: function(component, event, helper) {
        var developerName = component.get('v.developerName');
        if (developerName.indexOf('__') >= 0) {
	        developerName = developerName.split('__')[1];            
        }
        helper.listDashboards(component, developerName, function(err, dashboards) {
            //console.warn('dashboards: ', dashboards); 
            if (dashboards) {
                helper.describeDashboard(component, dashboards[0].id, function(err, dashboard) {
                    component.set('v.dashboardDef', dashboard);
                    helper.generatePageNav(component);                    
                });
            }
        });
        
        var filter = {};
        var json = JSON.stringify(filter, null, 2);
        component.set('v.filter', json);         
    },
    
    handleTabSelect: function(component, event, helper) {
        //console.warn('handleTabSelect: ', event, event.getSource());
        var params = event.getParams();
        var pageId = params.id;
        //console.warn('pageId: ', pageId);
        
        var filter = component.get('v.filter');
        var developerName = component.get('v.developerName');
        //console.warn("developerName: ", developerName);
        //console.warn("pageId: ", pageId);
        var evt = $A.get('e.wave:update');
        evt.setParams({
            value: filter,
            id: developerName,
            pageid: pageId,
            type: "dashboard"
        });
        evt.fire();
    },

    handleSelectionChanged: function (component, event, helper) {
        //console.warn('handleSelectionChanged: ', event.getParams(), JSON.stringify(event.getParams(), null, 2));
        
        
    }    
})