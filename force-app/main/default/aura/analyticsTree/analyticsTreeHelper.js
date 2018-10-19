({
    refreshTree: function(component, callback) {
        var items = [
            {
                label: 'Dashboards',
                name: 'dashboards',
                disabled: false,
                expanded: false,
                items: []
            },
            {
                label: 'Datasets',
                name: 'datasets',
                disabled: false,
                expanded: false,
                items: []
            },
            {
                label: 'Lenses',
                name: 'lenses',
                disabled: false,
                expanded: false,
                items: []
            },
            {
                label: 'Folders',
                name: 'folders',
                disabled: false,
                expanded: false,
                items: []
            },
            {
                label: 'Templates',
                name: 'templates',
                disabled: false,
                expanded: false,
                items: []
            }
        ];        
        
        component.set('v.items', items);
        
        var self = this;
        
        self.listDashboards(component, function(err, dashboards) {
            self.addAssetItems(component, 'dashboards', dashboards);
            
            self.listDatasets(component, function(err, datasets) {
                self.addAssetItems(component, 'datasets', datasets);
                
                self.listLenses(component, function(err, lenses) {
                    self.addAssetItems(component, 'lenses', lenses);
                    
                    self.listFolders(component, function(err, folders) {
                        self.addAssetItems(component, 'folders', folders);
                        
                        
                        self.listFolders(component, function(err, folders) {
                            self.addAssetItems(component, 'folders', folders);

                            self.listTemplates(component, function(err, templates) {
                                self.addAssetItems(component, 'templates', templates);
                                
                                if (typeof callback === 'function') {
                                    callback('ready');
                                }
                            });        
                        });                 
                    });
                });
            });
        });
    },
    
    selectItem: function(component, name) {
        //console.warn('selectItem: ', name);
        var items = component.get('v.items');
        //console.warn('items: ', items);
        
        var itemMaps = component.get('v.itemMaps');
        //console.warn('itemMaps: ', itemMaps);
        
        var itemMap = null;
        var item = null;
        for (var nodeLabel in itemMaps) {
            itemMap = itemMaps[nodeLabel];
            item = itemMap[name];
            if (item !== null && typeof item !== 'undefined') {
                break;
            }
        }
        //console.warn('item: ', item);
        //console.warn('nodeLabel: ', nodeLabel);
        if (item && item.asset) {
            component.set('v.assetType', item.asset.type);
            component.set('v.assetId', item.asset.id);
            component.set('v.asset', item.asset);
            
        }
        
    },
    
    createAssetDetailItem: function(component, key, label, value, resType, asset) {
        var self = this;    
        if (typeof value === "object") {
            //var label = key + (typeof value !== 'object' ? ': ' + value : '');
            var item = { 
                label: label + (typeof value !== 'object' ? ': ' + value : ''),
                name: key,
                asset: asset,
                expanded: false,
                disabled: false,
                items: []
            };
            
            var child = null;                
            if (value instanceof Array) {
                for (var i  = 0; i < value.length; i++) {
                    child = self.createAssetDetailItem(component, key + "[" + i + "]", '' + i, value[i], resType, asset);
                    item.items.push(child);
                }                    
            } else {
                for (var k in value) {
                    child = self.createAssetDetailItem(component, key + "." + k, k, value[k], resType, asset);
                    item.items.push(child);
                }                    
            }
            return item;
        } else {
            //var label = key + (typeof value !== 'object' ? ': ' + value : '');
            var item = {
                label: label + (typeof value !== 'object' ? ': ' + value : ''),
                name: key,
                asset: asset,
                expanded: false,
                disabled: false,
                items: []
            };
            return item;   
        }
    },
    
    addAssetItems: function(component, nodeLabel, assets) {
        var items = component.get('v.items') || [];
        
        var itemMaps = component.get('v.itemMaps') || {};
        
        var self = this;
        var parent = null;
        items.forEach(function(item) {
            if (item.name === nodeLabel) {
                parent = item;
            } 
        });
        
        var assetMap = itemMaps[nodeLabel] || {};
        var name = null;
        
        if (parent !== null) {
            assets.forEach(function(asset) {
                name = asset.namespace ? asset.namespace + '__' + asset.name : asset.name;
                var assetItem = { 
                    label: asset.label,
                    name: name,
                    asset: asset,
                    expanded: false,
                    disabled: false,
                    items: []
                };                
                var assetItems = [];
                var value = null;
                var item = null;
                for (var key in asset) {
                    value = asset[key];
                    item = self.createAssetDetailItem(component, asset.name + '.' + key, key, value, nodeLabel, asset);
                    assetItems.push(item);
                }
                assetItem.items = assetItems;
                parent.items.push(assetItem);
                
                assetMap[name] = assetItem;
            });
        }
        itemMaps[nodeLabel] = assetMap;
        
        component.set('v.itemMaps', itemMaps);
        
        component.set('v.items', items);
        
        /*
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
        */
    },
    
    listAssets: function(component, methodName, callback) {
        var sdk = component.find("sdk");
        
        var context = {apiVersion: "43"};
        var methodName = methodName;
        var methodParameters = {
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
            if (err !== null) {
                console.error("listAssets error: ", err);
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
    },
    
    listDashboards: function(component, callback) {
        this.listAssets(component, "listDashboards", function(err, data) {
            callback(err, data ? data.dashboards : null); 
        });
    },
    
    listDatasets: function(component, callback) {
        this.listAssets(component, "listDatasets", function(err, data) {
            callback(err, data ? data.datasets : null); 
        });
    },
    
    listLenses: function(component, callback) {
        this.listAssets(component, "listLenses", function(err, data) {
            callback(err, data ? data.lenses : null); 
        });
    },
    
    listFolders: function(component, callback) {
        this.listAssets(component, "listFolders", function(err, data) {
            callback(err, data ? data.folders : null); 
        });
    },
    
    listTemplates: function(component, callback) {
        this.listAssets(component, "listTemplates", function(err, data) {
            callback(err, data ? data.templates : null); 
        });
    }
    
})