({
    init : function(component, event, helper) {
        
        // Change SFDC format with _ to -
        var lang = component.get('v.lang');
        lang = lang.replace('_', '-');
        component.set('v.lang', lang);
        
        var vfOrigin = "https://" + component.get("v.vfHost");
        window.addEventListener("message", function(event) {
            if (event.origin !== vfOrigin) {
                // Not the expected origin: Reject the message!
                return;
            }
            // Handle the message
            console.log('LC received: ', event.data);
            let payload = event.data;
            let type = payload.type;
            if (type === 'hide_vf_frame') {
                let vfFrame = component.find('vfFrame');
                $A.util.addClass(vfFrame, 'hidden');
                component.set('v.state', 'home');
            } else {
                let callbackName = payload.callback;
                let err = payload.error || null;
                let resp = payload.response || null;
                if (payload.callback) {
                    helper[payload.callback](component, err, resp);
                }
            }
        }, false);
    },

    iframeLoaded: function(component, event, helper) {
    	console.warn('iframeLoaded');
        setTimeout(function() {
	        helper.setup(component);
            
        }, 500);
    },

    handleCommanderOutputEvent: function(component, event, helper){
        console.warn('handleCommanderOutputEvent: ', event);
        
        var text = event.getParam('text');
        var speech = event.getParam('speech');

        if (text) {
            helper.logSystem(component, text);
        }
        
        if (speech) {
            helper.speak(component, speech);
        }
    },
    
    handleSettingsClick: function(component, event, helper) {
    	let state = component.get('v.state');
        if (state === 'home') {
            state = 'settings';
        } else {
            state = 'home';
        }
        component.set('v.state', state);
    }, 
    
    keyCheck: function(component, event, helper) {
        if (event.which === 13) {
            helper.callCommander(component);
        }
    },
    
    callCommander: function(component, event, helper) {
        helper.callCommander(component);
    },
    
    type: function(component, event, helper) {
        component.set('v.state', 'typing');
    },
    
    listen: function(component, event, helper) {
        let state = component.get('v.state');
        if (state === 'speaking') {
            helper.stopListening(component);
           	component.set('v.state', 'home');
        } else {            
            helper.startListening(component);
            component.set('v.state', 'speaking');
        }
    },
   
    getVoices: function(component, event, helper) {
        let payload = {
            action: 'getVoices',
            callback: 'handleGetVoices'
        };
        helper.sendToVF(component, payload);
    },
    
	testSpeech: function(component, event, helper) {
        let payload = {
            action: 'speak',
            params: {
	            text: 'This is a test',
                voice: component.get('v.voiceName')
            },
            callback: 'handleSpeakCallback'
        };
        helper.sendToVF(component, payload);
    }
    
})