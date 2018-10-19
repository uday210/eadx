({
    init: function (component, event, helper) {
        //helper.refreshTree(component);
    },

	refresh: function (component, event, helper) {
		var params = event.getParam('arguments');
        var callback = params.callback;
        helper.refreshTree(component, callback);
    },
            
    handleClick:  function(cmp, event) {
        var nodeToAdd = event.getSource().get("v.value");
        var items = cmp.get('v.items');
        var computedName = '' + nodeToAdd + '.' + (items[nodeToAdd].items.length+ 1);
        var computedLabel = 'Level 2 Child ' + (items[nodeToAdd].items.length+ 1);
        var newItem = {
            label: computedLabel,
            name: computedName,
            expanded: true,
            disabled: false,
            items: []
        };
        items[nodeToAdd].items.push(newItem);
        cmp.set('v.items', items);
    },
    
    handleSelect: function (component, event, helper) {
        //console.warn('handleSelect: ', event.getParams(), JSON.stringify(event.getParams(), null, 2));
 
        var name = event.getParam('name');
        helper.selectItem(component, name);

    }    
})