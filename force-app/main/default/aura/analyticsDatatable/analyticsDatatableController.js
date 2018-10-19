({
    init: function(component, event, helper) {
        //helper.listLenses(component); 
        //console.log("init");
        // Called to get the theme name, not really needed
        /*
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(evt) {
            console.warn('ui theme name: ', evt.getReturnValue())
            component.set("v.uiThemeName", evt.getReturnValue());
        });
        $A.enqueueAction(action);        
        */
    },
    
    handleSAQLChange: function(component, event, helper) {
        helper.handleSAQLChange(component);    
    },
    
    handleRowSelection: function (component, event, helper) {
        
    },
    
    handleRowAction: function (component, event, helper) {
        
    },
    
    handleSort: function (component, event, helper) {
        var target = event.getSource();
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortedDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        
        var sortDirection = component.get("v.defaultSortedDirection");
        sortDirection = sortDirection === 'asc' ? 'desc': 'asc';
        
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        component.set("v.defaultSortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);        
    }    
})