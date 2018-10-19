({
	doInit: function(component, event, helper) {
		
        helper.refreshData(component);
	},
    
    handleSelectItem: function(component, event, helper) {
        
        var name = event.getParam('name');
        console.warn('handleSelectItem: ', name);
        var tokens = name.split(':');
        var type = tokens[0];
        var name = tokens[1];

        console.warn('type: ', type, ', name: ', name);
	
        var commandMap = component.get('v.commandMap');
        
        if (type === 'Command') {
            var command = commandMap[name];
            console.warn('command: ', JSON.parse(JSON.stringify(command)));
            component.set('v.command', command);
            
        }
        
    }
})