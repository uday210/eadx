({
    typeDetailsMethodMap: {
        'dashboard': 'describeDashboard',
        'dataset': 'describeDataset',
        'lens': 'describeLens',
        'template': 'getTemplate'
    },
    
    getAssetDetails: function(component, callback) {
        var self = this;
        var sdk = component.find('sdk');
        
        var asset = component.get('v.asset');
        if (asset === null || typeof asset === 'undefined') {
            callback(null, null);
        } else {
            //console.warn('asset: ', JSON.stringify(asset, null, 2));
            var assetType = asset.templateType ? 'template' : asset.type;
            //console.warn('assetType: ' , assetType);
            var assetId = asset.id;
            
            var dashboardId = asset.type === 'dashboard' ? assetId : null;
            var datasetId = asset.type === 'dataset' ? assetId : null;
            var lensId = asset.type === 'lens' ? assetId : null;
            var folderId = asset.type === 'folder' ? assetId : null;
            var templateId = asset.type === 'template' ? assetId : null;
            
            component.set('v.dashboardId', dashboardId);
            component.set('v.datasetId', datasetId);
            component.set('v.lensId', lensId);
            component.set('v.folderId', folderId);
            component.set('v.templateId', templateId);
            
            var context = {apiVersion: '44'};
            var camelTypeName = assetType.substring(0, 1).toUpperCase() + assetType.substring(1);
            component.set('v.assetCamelType', camelTypeName);
            
            var methodName = self.typeDetailsMethodMap[assetType];
            if (methodName) {                
                var methodParameters = {};
                methodParameters[assetType + 'Id'] = assetId;
                sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
                    if (err !== null) {
                        console.error(methodName + ' error: ', err);
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
                }));
            } else {
                if (callback !== null && typeof callback !== 'undefined') {
                    callback(null, null);
                }
            }
        }
    }   
})