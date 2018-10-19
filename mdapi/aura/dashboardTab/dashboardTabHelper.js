({
    update: function(component) {
    	console.warn('dashboardTabHelper.update');    
    },
    
    showDashboard: function(component, dashboardId, developerName, pageName, tabId) {
        
        //console.warn('dashboardTabHelper.showDashboard: ', dashboardId, developerName, pageName, tabId);
        var self = this;
        
            
        var outer = component.find("dashboard-outer");
        $A.util.removeClass(outer, "fadein");
        $A.util.addClass(outer, "fadeout");
        
        var config = {
            dashboardId: dashboardId + (pageName ? '/&pageId=' + pageName : ''),
            height: "800",
            openLinksInNewWindow: true,
            showHeader: false,
            showTitle: false,
            showSharing: false
        };
        //console.warn('config: ', config);
        $A.createComponent("wave:waveDashboard", config, function(cmp, msg, err) {
            var dashboard = component.find("dashboard");
            if (err) {
                console.warn("error: ", err);
            } else {
                $A.util.addClass(cmp, "dashboard-container");
                //$A.util.addClass(outer, "hidden");
                dashboard.set("v.body", [cmp]);
                setTimeout($A.getCallback(function() {
                    //$A.util.removeClass(outer, "hidden");
                    $A.util.removeClass(outer, "fadeout");
                    $A.util.addClass(outer, "fadein");
                }), 500);
            }            
        });
    },


    describeDashboard: function(component, dashboardId, callback) {
        var sdk = null;
        try {            
            sdk = component.find("sdk");
            console.warn('describeDashboard - sdk: ', sdk);
        } catch (e) {
            console.error("Exception: ", e);
            if (callback !== null && typeof callback !== 'undefined') {
                callback(e, null);
            }
            return;
        }
        
        var context = {apiVersion: "41"};
        var methodName = "describeDashboard";
        var methodParameters = {
            dashboardId: dashboardId
        };
        //sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
        sdk.invokeMethod(context, methodName, methodParameters, function(err, data) {
            //console.warn('describeDashboard returned: ', err, data);
            if (err !== null) {
                console.error("describeDashboard error: ", err);
                if (callback !== null && typeof callback !== 'undefined') {
                    callback(err, null);
                } else {
                    return err;
                }
            } else {
                if (callback !== null && typeof callback !== 'undefined') {
                    callback(null, data);
                } else {
                    return data;
                }
            }
        });
        //}));
    },
    
    // Forces dashboard to redraw
    updateSelection: function(component, init, target) {
        var values = init === true ? [component.get('v.fieldValue')] : [null];
        var self = this;
        var selection = {
            datasets: {}
        };
        
        selection.datasets[component.get("v.datasetName")] = [
            {
                fields: [component.get('v.fieldName')],
                selection: values
            }
        ];
        
        
        var json = JSON.stringify(selection);
        
        var dashboardId = target; //component.get('v.dashboardId');
        var evt = $A.get('e.wave:update');
        var params = {
            value: json,
            id: dashboardId,
            type: "dashboard"
        };
        evt.setParams(params);
        evt.fire();
        
        if (init === true) {
            setTimeout($A.getCallback(function() {
                self.updateSelection(component, false, target)
            }, 50));
        }
    }
})