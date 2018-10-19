({
	doInit: function(component, event, helper) {
        console.warn("doInit");
    },
    
    selectDashboard: function(component, event, helper) {
    	var dashboardId = component.get("v.dashboardId");
        var config = {
            dashboardId: dashboardId,
            height: "680",
            openLinksInNewWindow: false,
            showHeader: false,
            showTitle: false,
            showSharing: false
        };
        $A.createComponent("wave:waveDashboard", config, function(cmp, msg, err) {
            if (err) {
                console.warn("error: ", err);
            } else {
                $A.util.addClass(cmp, "dashboard-container");
                component.find("dashboard").set("v.body", [cmp]);
            }            
        });
    }
    
})