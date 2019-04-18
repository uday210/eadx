({
	init: function(cmp, event, helper) {
        var dashboardId = cmp.get('v.pageReference.state.c__dashboardId');
        var pageId = cmp.get('v.pageReference.state.c__pageId');
        cmp.set('v.dashboardId', dashboardId);
        cmp.set('v.pageId', pageId);
        helper.updateDashboard(cmp);
    },
    dashboardChanged: function(cmp, event, helper) {
        var dashboardId = event.getParam('value').state['c__dashboardId'];
        var forceRefresh = event.getParam('value').state['c__forceRefresh'];
        var dashboardChanged = forceRefresh || dashboardId !== event.getParam('oldValue').state['c__dashboardId'];
        $A.log('dashboardTab: dashboard updated ' + dashboardId);
        if (dashboardChanged){
            cmp.set('v.dashboardId', dashboardId);
            helper.updateDashboard(cmp);            
        }
        var pageId = event.getParam('value').state['c__pageId'];
        var pageChanged = pageId !== event.getParam('oldValue').state['c__pageId'];
        $A.log('dashboardTab: page updated ' + pageId);
        if (pageChanged){
            cmp.set('v.pageId', pageId);
            helper.updatePage(cmp);
        }
	},
    handleDashboardEvent: function(cmp, event){
        var dashboardId = event.getParam('dashboardId');
        var pageId = event.getParam('pageId');
        $A.log('dashboardTab: handleDashboardEvent: dashboardId: ' + 
               dashboardId + ', pageId:' + pageId);
        cmp.set('v.dashboardId', dashboardId);
        cmp.set('v.pageId', pageId);
    }
})