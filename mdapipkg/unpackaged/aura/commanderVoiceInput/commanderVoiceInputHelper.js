({
    actionResponseMap: {
        'default': {
            speech: 'Okay, now viewing {{itemType}} {{itemLabel}}',
            text: 'Okay, now viewing {{itemType}} {{itemLabel}}.'
        },
        'ViewAnalyticsDashboard': {
            speech: 'Okay, now viewing dashboard {{itemLabel}}',
            text: 'Okay, now viewing dashboard {{itemLabel}}.'
        },
        'AnalyticsDashboardUpdatePage': {
            speech: 'Okay, now changing to the {{itemLabel}} page',
            text: 'Okay, now changing to the {{itemLabel}} page.'
        },
        'ViewSobjectType': {
            speech: 'Okay, now viewing the {{itemLabel}} {{itemType}}',
            text: 'Okay, now viewing tbe {{itemLabel}} {{itemType}}.'            
        }
    },
    
    iconTypeMap: {
        //'default': 'https://adx-dev-ed.my.salesforce.com/analytics/wave/web/proto/images/app/icons/16.png',
        'default': '/analytics/wave/web/proto/images/app/icons/21.png',
        'ViewAnalyticsDashboard': '/analytics/wave/web/proto/images/thumbs/thumb-dashboard.png',
        'AnalyticsDashboardUpdatePage': '/analytics/wave/web/proto/images/app/icons/2.png',
        'ViewSobjectType': '/analytics/wave/web/proto/images/app/icons/16.png',
        'InvocableActionApex': 'https://adx-dev-ed.my.salesforce.com/analytics/wave/web/proto/images/app/icons/18.png',
        
    },
    
    setup: function(component) {
        let self = this;
        let payload = {
            action: 'getVoices',
            callback: 'handleGetVoices'
        };
        self.sendToVF(component, payload);            
    },
    
    sendToVF: function(component, payload) {
        let vfOrigin = "https://" + component.get("v.vfHost");
        let vfWindow = component.find("vfFrame").getElement().contentWindow;
        vfWindow.postMessage(payload, vfOrigin);
    },
    
    startListening: function(component) {
        let payload = {
            action: 'listen',
            callback: 'handleVoiceResult'
        };
        this.sendToVF(component, payload);	        
    },
    
    stopListening: function(component) {
        let payload = {
            action: 'stopListening',
            callback: 'handleVoiceResult'
        };
        this.sendToVF(component, payload);	        
    },
    
    speak: function(component, text) {
        let self = this;
        let payload = {
            action: 'speak',
            params: {
                text: text,
                voice: component.get('v.voiceName')
            },
            callback: 'handleSpeakCallback'
        };
        self.sendToVF(component, payload);
    },
    
    logUser: function(component, text) {
        let self = this;
        let log = component.find('log');
        log.log('right', text);
		let element = log.getElement();
		element.scrollTop = element.scrollHeight;
    },
    
    logSystem: function(component, text) {
        let self = this;
        let log = component.find('log');
        log.log('left', text);
		let element = log.getElement();
		element.scrollTop = element.scrollHeight;
    },
    
    callCommander: function(component) {
        let self = this;
        let inputText = component.get("v.inputText");
        let payload = {
            action: 'callCommander',
            params: {
                text: inputText
            },
            callback: 'handleCommanderResponse'
        };
        self.sendToVF(component, payload);
        self.logUser(component, inputText);
        component.set('v.inputText', null);
    },
    
    handleCommanderResponse: function(component, err, resp) {
        let self = this;
        if (err) {
            let error = JSON.parse(JSON.stringify(err));
            console.error('handleCommanderResponse error: ', err);
        } else {
            let response = JSON.parse(JSON.stringify(resp));
            console.warn('handleCommanderResponse response: ', response);
            let payload = response.payload;
            console.warn('payload: ', payload);
            
            if (payload) {
                let action = payload.action;
                console.warn('action: ', action);
                let response = payload.response;
                console.warn('response: ', response);
                
                switch (action.type) {
                    case 'ViewSobjectType':
                        break;    
                    case 'ViewAnalyticsDashboard':
                        break;    
                    case 'AnalyticsDashboardUpdatePage':
                        break;    
                    case 'InvocableActionApex':
                        let commandTarget = action.commandTarget;
		                console.warn('commandTarget: ', commandTarget);
                        
                        let actionResults = response.actionResults;
                        console.warn('actionResults: ', actionResults);
                        actionResults.forEach(function(actionResult) {
                            console.warn('actionResult: ', actionResult);
                            let outputValues = actionResult.outputValues;
                            console.warn('outputValues: ', outputValues);
                            
                            if (outputValues.text) {
                            	self.logSystem(component, outputValues.text);
                        	}
                            if (outputValues.speech) {
	                            self.speak(component, outputValues.speech);
                            }
                        });

                        break;    
                    default:
                        break;    
                }
                
            }

            if (response.action.type !== 'InvocableActionApex') {
            
                if (response.action) {
                    let a = self.actionResponseMap[response.action.type] || self.actionResponseMap['default'];
                    let actionResponse = {
                        speech: a.speech.slice(),
                        text: a.text.slice()
                    };
                    console.warn('actionResponse: ', actionResponse);
                    for (let key in response.action) {
                        let regex = new RegExp('\{\{' + key + '\}\}', 'g');
                        actionResponse.speech = actionResponse.speech.replace(regex, response.action[key]);
                        actionResponse.text = actionResponse.text.replace(regex, response.action[key]);
                    }
                    console.warn('actionResponse: ', actionResponse);
                    self.speak(component, actionResponse.speech);
                    self.logSystem(component, actionResponse.text);
                }
                /*
                if (response.text) {
                    //component.set('v.inputText', response.text);
                    self.speak(component, response.text);
                }
                */
            }
        }		
    },
    
    handleVoiceResult: function(component, err, resp) {
        let self = this;
        if (err) {
            let error = JSON.parse(JSON.stringify(err));
            console.error('handleVoiceResult error: ', err);
        } else {
            let response = JSON.parse(JSON.stringify(resp));
            console.warn('handleVoiceResult response: ', response);
            
            console.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5 response.phase: ', response.phase);
            
            if (response.phase === 'onresult') {
  
                if (response.text) {
                    //component.set('v.inputText', response.text);
                    self.logUser(component, response.text);
                }
                
                let payload = response.payload;
                console.warn('payload: ', payload);
                
                if (payload) {
                    let action = payload.action;
                    console.warn('action: ', action);
                    let response = payload.response;
                    console.warn('response: ', response);
                    
                    switch (action.type) {
                        case 'ViewSobjectType':
                            break;    
                        case 'ViewAnalyticsDashboard':
                            break;    
                        case 'AnalyticsDashboardUpdatePage':
                            break;    
                        case 'InvocableActionApex':
                            let commandTarget = action.commandTarget;
                            console.warn('commandTarget: ', commandTarget);
                            
                            let actionResults = response.actionResults;
                            console.warn('actionResults: ', actionResults);
                            actionResults.forEach(function(actionResult) {
                                console.warn('actionResult: ', actionResult);
                                let outputValues = actionResult.outputValues;
                                console.warn('outputValues: ', outputValues);
                                
                                if (outputValues.text) {
                                    self.logSystem(component, outputValues.text);
                                }
                                if (outputValues.speech) {
                                    self.speak(component, outputValues.speech);
                                }
                            });
    
                            break;    
                        default:
                            break;    
                    }
                    
                }                
                
                if (response.action.type !== 'InvocableActionApex') {
                
                    if (response.action) {
                        let a = self.actionResponseMap[response.action.type] || self.actionResponseMap['default'];
                        let actionResponse = {
                            speech: a.speech.slice(),
                            text: a.text.slice()
                        };                
                        console.warn('actionResponse: ', actionResponse);
                        for (let key in response.action) {
                            let regex = new RegExp('\{\{' + key + '\}\}', 'g');
                            actionResponse.speech = actionResponse.speech.replace(regex, response.action[key]);
                            actionResponse.text = actionResponse.text.replace(regex, response.action[key]);
                        }
                        self.speak(component, actionResponse.speech);
                        self.logSystem(component, actionResponse.text);
                    }
                }                
            }
        }
        
        component.set('v.state', 'home');
    },
    
    handleSpeakCallback: function(component, err, resp) {
        let self = this;        
        if (err) {
            let error = JSON.parse(JSON.stringify(err));
            console.error('handleSpeakCallback error: ', err);
        } else {
            let response = JSON.parse(JSON.stringify(resp));
            console.warn('handleSpeakCallback response: ', response);
        }
        component.set('v.state', 'home');
    },
    
    handleGetVoices: function(component, err, resp) {
        let self = this;        
        if (err) {
            let error = JSON.parse(JSON.stringify(err));
            console.error('handleGetVoices error: ', err);
        } else {
            let response = JSON.parse(JSON.stringify(resp));
            console.warn('handleGetVoices response: ', response);
            if (response.voices) {
                let voices = response.voices;
                let voiceMap = {};
                let langMap = {};                
                voices.forEach(function(voice) {
                    voiceMap[voice.name] = voice;
                    langMap[voice.lang] = voice.lang;
                });
                console.warn('langMap: ', langMap);
                let languages = [];
                for (var lang in langMap) {
                    languages.push(lang);
                }
                languages.sort();
                console.warn('languages: ', languages);
                component.set('v.voices', voices);
                component.set('v.voiceMap', voiceMap);
                component.set('v.languages', languages);
            }
        }
    }
    
})