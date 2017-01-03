CORE.create_module("pluginid-3", function (sb) {
    var me;
    var control;
    var recognition;
    return {
        init: function () {
            me = this;
            sb.listen({
                'pluginid-3': me.processData
            });

        },

        processData: function (data) {
            if (data) {
                control = data.outputs[0];
                sb.addEvent(control, "focus", me.focus);
                sb.addEvent(control, "focusout ", me.focusout);
            }
        },

        focusout: function (evt) {
            if (recognition) {
                recognition.stop();
            }
        },

        focus: function(evt) {
            window.speechRecognition = (window.speechRecognition || window.webkitSpeechRecognition);

            // Check access to the speech recogntion object
            if (window.speechRecognition) {
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                //recognition.lang = "en-GB";
                recognition.start();

                //recognition.onstart = function () { console.log("Speech recognition started."); }
                recognition.onresult = function (event) {

                    var transcript = event.results[0][0].transcript;
                    console.log(transcript);
                    control.val(transcript);
                    recognition.stop();
                }

                recognition.onerror = function (event) { console.log("Error", event); }
                //recognition.onend = function () { console.log("Speech recognition ended"); }
            } else {
                console.error("Speech recognition is not available on this device.");
            }
        },

        destroy: function () {
            sb.ignore(['pluginid-3']);
            me = null;            
        }
    };
});