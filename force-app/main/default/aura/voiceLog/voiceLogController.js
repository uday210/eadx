({
    init: function(component, event, helper) {
        helper.init(component);
    },
    
    log: function(component, event, helper) {
        let params = event.getParam('arguments');
        let entry = {
            user: params.user,
            text: params.text
        }
        helper.log(component, entry);
    },
    
    clear: function(component, event, helper) {
        helper.clear(component);
    },
    
})