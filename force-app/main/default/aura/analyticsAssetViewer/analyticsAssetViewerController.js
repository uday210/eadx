({
	handleAssetChange: function(component, event, helper) {
        helper.getAssetDetails(component, function(err, assetDetails) {
            if (assetDetails !== null && typeof assetDetails !== 'undefined') {
                var json = JSON.stringify(assetDetails, null, 4);
                component.set('v.json', json);
                component.set('v.assetDetails', assetDetails);                
            } else {
                var asset = component.get('v.asset');
                var json = JSON.stringify(asset, null, 4);
                component.set('v.json', json);
            }
        });
	}
})