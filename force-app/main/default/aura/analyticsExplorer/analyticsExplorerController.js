({
	init: function (component, event, helper) {
        helper.handleRefresh(component);
    },
    
    handleSelect: function(component, event, helper) {
        console.warn('analyticsExplorerController.handleSelect: ', event);
    },
    
    handleRefresh: function(component, event, helper) {
        helper.handleRefresh(component);
    },
    
    handleView: function(component, event, helper) {        
        //console.warn('analyticsExplorerController.handleView: ', event);
        var asset = component.get('v.asset');
        console.warn('asset: ', asset);
        if (asset !== null && typeof asset !== 'undefined') {
            console.warn('editing: ', asset);
            
            var url = '/analytics/wave/wave.apexp/#' + asset.type + '/' + asset.id;
            var win = window.open(url, '_blank');
            win.focus();            
        }
    },
    
    handleEdit: function(component, event, helper) {        
        //console.warn('analyticsExplorerController.handleEdit: ', event);
        var asset = component.get('v.asset');
        console.warn('asset: ', asset);
        if (asset !== null && typeof asset !== 'undefined') {
            console.warn('editing: ', asset);
            
            var url = '/analytics/wave/wave.apexp/#' + asset.type + '/' + asset.id + '/edit';
            var win = window.open(url, '_blank');
            win.focus();            
        }
    }
    
})