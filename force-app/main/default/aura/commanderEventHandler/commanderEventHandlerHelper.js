({
	fireCommanderState : function(cmp, state) {
        cmp.set('v.commanderState', state);
	},
    
    fireAnalyticsAppCreateEvent: function(cmp, event, autoInstallRequests){
        var event = cmp.getEvent("AnalyticsAppCreate");
        if (event && autoInstallRequests.length > 0){
            event.setParam('autoInstallRequest', autoInstallRequests[0].outputValues);
            event.fire();
        }
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
    },
    handleMultipleResults: function(cmp, columns, results, keyAttribute, selectHandler){
        $A.log('Multiple records returned, displaying in picker.');
        var modalBody, modalOverlay;
        $A.createComponent('c:genericJsonDataGrid', {
            'items': results, 
            'keyAttr': keyAttribute ? keyAttribute : 'Id',
            'cols': columns,
            'onselect': function(selected){
                if (modalOverlay){
                    modalOverlay.close();
                }
                selectHandler(selected);
            }
        }, function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   cmp.find('overlayApi').showCustomModal({
                       header: "Results",
                       body: modalBody, 
                       showCloseButton: true,
                       closeCallback: function() {
                       }
                   }).then(function(overlay){
                       modalOverlay = overlay;
                   });
               }                               
           });
    },
    navigateTo: function(cmp, pageReference){
        var navService = cmp.find("navService");
        if (navService){
            navService.generateUrl(pageReference)
                .then($A.getCallback(function(url){
                    $A.log('url:' + url);
                    navService.navigate(pageReference);
                }), $A.getCallback(function(error){
                    $A.log('Record url error:' + error);
                }));
        } else {
            $A.log('Unable to find navigation service.')
        }
    },
    viewSobject: function(cmp, sobject){
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                recordId: sobject.id
            }
        };
        $A.log('Navigating to sobject:' + sobject.name + ", id: " + sobject.id);
		this.navigateTo(cmp, pageReference);
        this.fireCommanderState(cmp, sobject.state);
    },
    viewDashboardWithState: function(cmp, state){
        var pageReference = {
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'eadx__Analytics_Dashboard'
            },
            state: state
        };
		this.navigateTo(cmp, pageReference);
    },
    viewDashboard: function(cmp, dashboard){
        console.warn('viewDashboard: ', dashboard);
        $A.log('Navigating to dashboard:' + dashboard.name + ", id: " + dashboard.id);
        this.viewDashboardWithState(cmp, {c__dashboardId: dashboard.id, c__forceRefresh: true});
        this.fireCommanderState(cmp, dashboard.state);
    },
    viewDashboardPage: function(cmp, page){
        $A.log('Navigating to dashboard page:' + page.name + ", id: " + page.id);
        this.viewDashboardWithState(cmp, {c__dashboardId:page.id, c__pageId: page.name});
        this.fireCommanderState(cmp, page.state);
    },
    
    
    fireDashboardStateEvent: function(component, values, commanderState) {
        //console.warn('fireDashboardStateEvent: ', values, commanderState);
        let t0 = Date.now();
        let self = this;
        let tokens = commanderState.split('.');
        let type = tokens[1];
        let id = tokens[2];
        let actionType = values.actionType;
        let fieldName = values.fieldName;
        let fieldValue = values.fieldValue;
                                
        if (type === 'Dashboard') {
            let t0 = Date.now();
            self.describeDashboard(component, id, function(err, dashboard) {
	            let t1 = Date.now();
                console.warn('describeDashboard time: ' + (t1 - t0) + ' ms ');                            
                if (err !== null) {
                    console.warn('describeDashboard error: ', err);
                } else {
                    dashboard.datasets.forEach(function(dataset) {
			            let t2 = Date.now();            
                        self.describeDataset(component, dataset.id, $A.getCallback(function(err, datasetDesc) {
				            let t3 = Date.now();
                            console.warn('describeDataset time: ' + (t3 - t2) + ' ms ');                            
                            if (err !== null) {
                                console.warn('describeDataset error: ', err);
                            } else {
                                
				            	let t4 = Date.now();
                                self.getDatasetFields(component, datasetDesc.id, datasetDesc.currentVersionId, $A.getCallback(function(err, fields) {
						            let t5 = Date.now();
    		                        console.warn('describeDataset time: ' + (t5 - t4) + ' ms ');                            
                                    if (err !== null) {
                                        console.warn('getDatasetFieldserror: ', err);
                                    } else {
                                        let t6 = Date.now();
                                       	let matchingField = self.findMatchingField(component, fieldName, fields);
                                        let t7 = Date.now();
                                        console.warn('matchingField: ', matchingField, ' found in ' + (t7 - t6) + ' ms');
                                        if (matchingField !== null) {
                                            
                                            if (actionType === 'reset_filter' || actionType === 'clear_selection') {
                                                // No need to get field values for reset/clear
                                                let tfinal = Date.now();
                                                console.warn('Total time for fireDashboardStateEvent: ' + (tfinal - t0) + ' ms');
                                                self.fireCommanderOutputEvent(component, {actionType: actionType, fieldName: matchingField.label, fieldValue: null});
                                                self.fireWaveUpdateEvent(component, actionType, dashboard, datasetDesc, matchingField.field, null);
                                            } else {
                                                
                                                let t8 = Date.now();
                                                self.getFieldValues(component, matchingField, datasetDesc, function(err, records) {
                                                    let t9 = Date.now();
						                            console.warn('getFieldValues time: ' + (t9 - t8) + ' ms ');
                                                    
                                                    //console.warn('getFieldValues returned: ', err, records);
                                                    
                                                    if (err) {
                                                        console.error('execQuery error: ', err);
                                                    } else {
                                                        
                                                        let set = [];
                                                        records.forEach(function(record) {
                                                            set.push(record[matchingField.field]);
                                                        });
                                                        let result = window.stringSimilarity.findBestMatch(fieldValue, set);
                                                        //console.warn('result: ', result);
                                                        let matchValue = result.bestMatch.target;
                                                        //console.warn('matchValue: ', matchValue);
                                                        
/*                                                        
                                                        // Levenshtein
                                                        let record = null;
                                                        let value = null;
                                                        let matchValue = null;
                                                        let distance = -1;
                                                        let minDistance = 1000000;
                                                        let bestMatch = null;
                                                        let strippedFieldValue = self.strip(fieldValue);
                                                        let strippedValue = null;

                                                        //console.warn('looking for ', fieldValue.toLowerCase());
                                                        for (var i = 0; i < records.length; i++) {
                                                            record = records[i];
                                                            //console.warn('record: ', record);
                                                            value = record[matchingField.field];
                                                            //console.warn('value: ', value, value.toLowerCase());
                                                            if (fieldValue.toLowerCase() === value.toLowerCase()) {
                                                                matchValue = value;
                                                                break;
                                                            } else {
                                                                strippedValue = self.strip(value);
                                                                distance = window.levenshtein(strippedFieldValue, strippedValue);
                                                                if (distance < minDistance) {
                                                                    minDistance = distance;
                                                                    bestMatch = value;
                                                                }
                                                            }
                                                        }
                                                        console.warn('matchValue: ', matchValue);
                                                        console.warn('bestMatch: ', bestMatch);
                                                        matchValue = matchValue || bestMatch;
*/                                                        
                                                        let tfinal = Date.now();
                                                        console.warn('Total time for fireDashboardStateEvent: ' + (tfinal - t0) + ' ms');
                                                        self.fireCommanderOutputEvent(component, {actionType: actionType, fieldName: matchingField.label, fieldValue: matchValue});
                                                        self.fireWaveUpdateEvent(component, actionType, dashboard, datasetDesc, matchingField.field, matchValue);
                                                    }
                                                    
                                                });
                                            }
                                        }
                                    }
                                }));
                            }
                        }));
                    });
                }                
            });
        }
    },
    
   	commanderOutputMap: {
        'default': {
            speech: 'Okay, now {{actionType}} {{fieldName}} by {{fieldValue}}',
            text: 'Okay, now {{actionType}} {{fieldName}} by {{fieldValue}}.'
        },
        'filter': {
            speech: 'Okay, now filtering {{fieldName}} by {{fieldValue}}',
            text: 'Okay, now filtering {{fieldName}} by {{fieldValue}}.'
        },
        'selection': {
            speech: 'Okay, now selecting {{fieldName}} by {{fieldValue}}',
            text: 'Okay, now selecting {{fieldName}} by {{fieldValue}}.'
        },
        'reset_filter': {
            speech: 'Okay, now resetting {{fieldName}} filter',
            text: 'Okay, now resetting {{fieldName}} filter.'            
        },
        'clear_selection': {
            speech: 'Okay, now clearing the {{fieldName}} selection',
            text: 'Okay, now clearing the {{fieldName}} selection.'            
        }        
    },
    
    fireCommanderOutputEvent: function(component, config) {
        let self = this;
        
        let a = self.commanderOutputMap[config.actionType] || self.commanderOutputMap['default'];
        let actionResponse = {
            speech: a.speech.slice(),
            text: a.text.slice()
        };
        console.warn('actionResponse: ', actionResponse);
        for (let key in config) {
            let regex = new RegExp('\{\{' + key + '\}\}', 'g');
            actionResponse.speech = actionResponse.speech.replace(regex, config[key]);
            actionResponse.text = actionResponse.text.replace(regex, config[key]);
        }
        console.warn('actionResponse: ', actionResponse);


        let evt = $A.get('e.c:CommanderOutputEvent');
        console.warn('evt: ', evt);
        evt.setParams({
            text: actionResponse.text,
            speech: actionResponse.speech
        });
        console.warn('evt.getParam("text"): ', evt.getParam('text'));
        console.warn('evt.getParam("speech"): ', evt.getParam('speech'));
        evt.fire();
        console.warn('after event fired');
    },
    
    fireWaveUpdateEvent: function(component, actionType, dashboard, datasetDesc, fieldName, value) {
        //console.warn('commanderEventHandlerHelper.fireWaveUpdateEvent');
        
        let payload = null;
        
        let datasetDevName = (datasetDesc.namespace ? datasetDesc.namespace + '__' : '') + datasetDesc.name;
        
        if (actionType === 'filter' || actionType === 'reset_filter') {
            
            let filter = {
                datasets:{}
            };
            
            filter.datasets[datasetDevName] = [
                {
                    fields: [fieldName],
                    filter: {
                        operator: 'in',
                        values: [value]
                    }				
                }
            ];
            
            //console.warn('filter: ', filter);
            payload = JSON.stringify(filter);
            
        } else if (actionType === 'selection' || actionType === 'clear_selection') {
            
            let selection = {
                 datasets:{}
            };
            
            selection.datasets[datasetDevName] = [
                {
                    fields: [fieldName],
                    selection: [value]
                }   
            ];
            
            //console.warn('selection: ', selection);
            payload = JSON.stringify(selection);
        }
        
        let evt = $A.get('e.wave:update');
        //console.warn('evt: ', evt);
        evt.setParams({
            value: payload,
            id: dashboard.id,
            type: "dashboard"            
        });    
        evt.fire();
    },
    
    getFieldValues: function(component, field, datasetDesc, callback) {
        //console.warn('getFieldValues: ', field, datasetDesc);
        
        let saql = '';
        saql += 'q = load "' + datasetDesc.id + '/' + datasetDesc.currentVersionId + '";'
        saql += 'q = group q by \'' + field.field + '\';';
        saql += 'q = foreach q generate \'' + field.field + '\' as \'' + field.field + '\', count() as \'count\';';
        saql += 'q = order q by \'' + field.field + '\' asc;';
       	saql += 'q = limit q 2000';
        
        //console.warn('saql: ', saql);
        
        let self = this;
        self.execQuery(component, saql, function(err, res) {
            //console.warn('execQuery returned: ', err, res);
            if (typeof callback === 'function') {
                if (err !== null) {
                    callback(err, null);
                } else {
                    let response = JSON.parse(res);
                    let results = response.results;
                    let records = results.records;
                	callback(null, records);
                }
            }
        });
    },
    
    execQuery: function(component, query, callback) {
        //console.warn('execQuery: ', query);
        var action = component.get("c.execQuery");
        var self = this;
        action.setParams({query: query});
        action.setCallback(this, function(response) {
            //console.warn('response: ', response);
            var state = response.getState();
            //console.warn('state: ', state);
            if (state === "SUCCESS") {
                var val = response.getReturnValue();
                if (callback !== null && typeof callback !== 'undefined') {
                    callback(null, val);
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            } else if (state === "ERROR") {
                var err = response.getError();
                console.error('error: ', err);
                if (callback !== null && typeof callback !== 'undefined') {
                    callback(err, null);
                }
            }            
        });
        $A.enqueueAction(action);
    },     
    
    strip: function(str) {
        let s = str.toLowerCase().replace(new RegExp('[-\\,_.\\s]', 'g'), '').trim();
        return s;
    },
    
    findMatchingField: function(component, fieldName, fields) {
        let self = this;
        let value = null;
        let match = null;
        let item = null;
        let label = null;
        let fieldNameLC = self.strip(fieldName);
        
        // Create a map of all field labels, names, origins (other?)
        let fieldMap = {};
        for (var key in fields) {
            value = fields[key];
            if (value instanceof Array) {
                value.forEach(function(field) {
                    if (field.label) {
	                    fieldMap[self.strip(field.label)] = field;                    
                    }
                    if (field.field) {
	                    fieldMap[self.strip(field.field)] = field;
                    }
                    if (field.origin) {
                    	fieldMap[self.strip(field.origin)] = field;
                    }
                });        
            }
        }
        
        let set = Object.keys(fieldMap);
        let result = window.stringSimilarity.findBestMatch(fieldName, set);
        match = fieldMap[result.bestMatch.target];
        
        // Levenshtein
        /*
        let distance = -1;
        let minDistance = 1000000;
        let bestMatch = null;
        for (var name in fieldMap) {
			distance = window.levenshtein(fieldNameLC, name);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = name;
            }
        }
        
        console.warn('minDistance: ', minDistance);
        console.warn('bestMatch: ', bestMatch);
        
        if (bestMatch !== null) {
            match = fieldMap[bestMatch];
        }
        console.warn('match: ', match);
        */
        
/*        
        // Simple match
        for (var key in fields) {
            value = fields[key];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    item = value[i];
                    //console.warn('item: ', item);
                    try {
                        if (fieldNameLC === item.label.toLowerCase()) {
                            match = item;
                            break;
                        } else if (fieldNameLC === item.field.toLowerCase()) {
                            match = item;
                            break;
                        } else if (fieldNameLC === item.origin.toLowerCase()) {
                            match = item;
                            break;
                        }
                    } catch (e) {}
                }
            }
        }
*/        
        //console.warn('match: ', match);
        return match;
    },
    
    describeDashboard: function(component, dashboardId, callback) {
        var sdk = component.find("sdk");
        //console.warn('sdk: ', sdk);
        
        var context = {apiVersion: "45"};
        var methodName = "describeDashboard";
        var methodParameters = {
            dashboardId: dashboardId
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
            //console.warn('describeDashboard returned: ', err, data);
            if (err !== null) {
                console.error("describeDashboard error: ", err);
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
    
     describeDataset: function(component, datasetId, callback) {
        var sdk = component.find("sdk");
        
        //console.warn("-----------------------------------------------------> sdk: ", sdk);
        
        var context = {apiVersion: "45"};
        var methodName = "describeDataset";
        var methodParameters = {
            datasetId: datasetId
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
            //console.warn('describeDataset returned: ', err, data);
            if (err !== null) {
                console.error("describeDataset error: ", err);
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
    
    getDatasetFields: function(component, datasetId, versionId, callback) {
        var sdk = component.find("sdk");
        
        var context = {apiVersion: "45"};
        var methodName = "getDatasetFields";
        var methodParameters = {
            datasetId: datasetId,
            versionId: versionId
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function(err, data) {
            //console.warn('getDatasetFields returned: ', err, data);
            if (err !== null) {
                console.error("getDatasetFields error: ", err);
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
    
    
})