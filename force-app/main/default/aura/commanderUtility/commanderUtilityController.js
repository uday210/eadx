({
	init: function(cmp, event, helper){
        cmp.set('v.commanderState', null);
        cmp.set('v.history', []);
	},
    callCommander: function(cmp, event, helper) {
        helper.callCommander(cmp, event);
	},
    checkForEnter: function(cmp, event, helper){
        if(event.which === 13){
            helper.callCommander(cmp, event);
        }
    },
    handleCommanderEvent: function(cmp, event, helper){ 
        cmp.set('v.requestInProgress', false);
        helper.fireActionableEvent(cmp, event);
    },
    handleCommanderError: function(cmp, event, helper) {
        var errorMessage = event.getParam('message');
        helper.toaster(errorMessage, 'error', '8000')
        cmp.set('v.requestInProgress', false);
    },
    checkForArrow: function(cmp, event, helper){
        if(event.which === 38){ // up arrow
            helper.historyUp(cmp);
        } else if(event.which === 40){ // down arrow
            helper.historyDown(cmp);
        } else if(event.which === 27){ // esc 
            helper.closeUtilityBar(cmp);
        }
    },
    closeHelp: function(cmp, event, helper){        
        cmp.set('v.helpOpen', false);
    },
	onContextualStateChange: function(cmp, event, helper){
        helper.pwd(cmp);
	}
})