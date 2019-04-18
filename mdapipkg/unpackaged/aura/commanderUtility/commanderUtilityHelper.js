({
	callCommander: function(cmp, event) {
		if (cmp.get('v.requestInProgress') || !cmp.get('v.command')){
			return;
		}
        var command = cmp.get('v.command');
        var history = cmp.get('v.history');
        if (command && command.trim() !== ''){
            var segments = command.split(' ');
            var firstSegment = segments[0];
            // It's a local command
            if (firstSegment === '?cws'){
                this.cws(cmp);
		        cmp.set('v.command', null);
            } else if (firstSegment === '?cs'){
                this.cs(cmp, segments.slice(1).join());
		        cmp.set('v.command', null);
            } else if (firstSegment === '??'){
                this.help(cmp);
            } else{                
                cmp.set('v.requestInProgress', true);
                var commanderApi = cmp.find('commanderApi');
                commanderApi.interpretAndInvoke(command);
                this.closeUtilityBar(cmp);            
            }
	        history.push(command);
            cmp.set('v.history', history);
            cmp.set('v.historyIndex', null);
            cmp.set('v.command', null);
        }
	},
    fireActionableEvent: function(cmp, event){        
        var payload = event.getParam('payload');
        var actionType = payload.action.type;
        var state = payload.response.state;
        if (state){
            cmp.set('v.commanderState', state);
        }
        var event = cmp.getEvent(actionType);
        if (event){
            switch(actionType){
                case "ViewSobjectType":
                	event.setParam('sobjects', 
                    	payload.response.sobjects);
                    break;
                case "ViewAnalyticsDashboard":
                	event.setParam('dashboards', 
                    	payload.response.items);
                    break;
                case "AnalyticsDashboardUpdatePage":
                	event.setParam('pages', 
                    	payload.response.items);
                    break;
                case "InvocableActionApex":
                	event.setParam('target', 
                    	payload.action.commandTarget);
                	event.setParam('actionResults', 
                    	payload.response.actionResults);
                    break;
            }
            event.fire();
        }
    },
    closeUtilityBar: function(cmp){
        var utilityApi = cmp.find("utilitybar");
        if (utilityApi){
			utilityApi.minimizeUtility();            
        }        
    },
    historyUp: function(cmp){
        var index = cmp.get('v.historyIndex');
        var history = cmp.get('v.history');
        var index = index == null || index === undefined ? 
            history.length-1 :
            index >= 0 ? index -1 : index;
        if (index >= 0){
            cmp.set('v.command', history[index]);
            cmp.set('v.historyIndex', index);
        }
    },
    historyDown: function(cmp){
        var index = cmp.get('v.historyIndex');
        var history = cmp.get('v.history');
        var indexSet = index != null && index !== undefined;
        var index =  indexSet ? index+1 : index;
        if (indexSet && index < history.length){
            cmp.set('v.command', history[index]);
            cmp.set('v.historyIndex', index);
        } else {
            cmp.set('v.command', null);
            cmp.set('v.historyIndex', null);            
        }
    },
    cws: function(cmp){
        var commanderState = cmp.get('v.commanderState');
        var rv = 'Commander State: ' + ((commanderState === undefined || 
                                         commanderState === null || 
                                         commanderState.trim() === '') ? 
            '<root>' : commanderState);
        this.toaster(rv, 'success');
    },
    cs: function(cmp, path){
        var commanderState = cmp.get('v.commanderState');
        var pathSegments = path.split('/').filter(function (el) {
              return el.trim() !== '';
            });
        if (path.startsWith('/') || commanderState.trim() === ''){
            commanderState = pathSegments.join('.');
        } else {        
            commanderState += '.' + pathSegments.join('.');
        }
        cmp.set('v.commanderState', commanderState);
        this.cws(cmp);
    },
    help: function(cmp){
        cmp.set('v.helpOpen', true);        
    },
    toaster: function(message, type, duration){
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent){
            toastEvent.setParams({
                message: message,
                duration: duration ? duration : '5000',
                key: 'info_alt',
                type: type,
                mode: 'pester'
            });
            toastEvent.fire();            
        }
        else{
            $A.log('commanderUtilityController: ' + message);
        }        
    }
})