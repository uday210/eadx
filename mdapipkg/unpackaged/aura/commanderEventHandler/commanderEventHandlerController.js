({
	scriptsLoaded: function(component, event, helper) {
       // console.warn('levenshtein: ', levenshtein);
        console.warn('window.levenshtein: ', window.levenshtein);
	},
    
	handleViewSobjectTypePayload: function(cmp, event, helper) {
        console.warn('handleViewSobjectTypePayload');        
        var sobjects = event.getParam('sobjects');
        if (sobjects.length == 1){
            helper.viewSobject(cmp, sobjects[0]);
        } else if (sobjects.length > 1){
            helper.handleMultipleResults(cmp, ['name'], sobjects, 'id', function(sobject){
            	helper.viewSobject(cmp, sobject);
            });
        } else{
            helper.toaster('No records found.', 'error');
        }
	},
	handleDashboardEventPayload: function(cmp, event, helper) {
        console.warn('handleDashboardEventPayload');
        var dashboards = event.getParam('dashboards');
        if (dashboards.length == 1){
            helper.viewDashboard(cmp, dashboards[0]);
        } else if (dashboards.length > 1){
            helper.handleMultipleResults(cmp, ['label', 'description'], dashboards, 'id', function(dashboard){
            	helper.viewDashboard(cmp, dashboard);
            });
        } else{
            helper.toaster('No dashboards found.', 'error');
        }
	},
	handleDashboardUpdatePagePayload: function(cmp, event, helper) {
        console.warn('handleDashboardUpdatePagePayload');
        var pages = event.getParam('pages');
        if (pages.length == 1){
            helper.viewDashboardPage(cmp, pages[0]);
        } else if (pages.length > 1){
            helper.handleMultipleResults(cmp, ['label'], pages, 'name', function(page){
            	helper.viewDashboardPage(cmp, page);
            });
        } else{
            helper.toaster('No pages found.', 'error');
        }
	}, 
    handleInvocableActionApex: function(cmp, event, helper){
        console.warn('handleInvocableActionApex: ', event);
        
        var actionResults = event.getParam('actionResults');
        console.warn('actionResults: ', actionResults);

        var commanderState = cmp.get('v.commanderState');
        console.warn('commanderState: ', commanderState);
    
        actionResults.forEach(function(actionResult) {
            console.warn('actionResult: ', actionResult);
            if (actionResult.actionName.indexOf('DashboardStateInvocable') >= 0) {
                helper.fireDashboardStateEvent(cmp, actionResult.outputValues, commanderState);
            }
        });
        
        // Older below
        /*
        var analyticsAppCreateTargets = cmp.get('v.appCreateTargets');  
		var eventTarget = event.getParam('target');
        if (eventTarget !== null && typeof eventTarget !== 'undefined') {
            var actionResults = null;
            if (analyticsAppCreateTargets.indexOf(eventTarget.name >= 0)){
                actionResults = event.getParam('actionResults');
                helper.fireAnalyticsAppCreateEvent(cmp, event, actionResults);                
            }
        }
        */
    }
})