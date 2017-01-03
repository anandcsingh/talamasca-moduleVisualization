talamasca.modules.inputArbiter = function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'input-arbiter': me.processInput
            });
        },

        processInput: function (data) {
            if (data) {
                
                if (data.plugins) {
                   

                    if (data.plugins && data.plugins.length > 0) {
                        for (var i = 0; i < data.plugins.length; i++) {
                            var pluginId = data.plugins[i].pluginid;
                            var params = data.plugins[i].params;
                            var inputIds = data.plugins[i].inputids;
                            var outputIds = data.plugins[i].outputids;
                            me.handlePlugin(data, data.plugins[i]);
                        }
                    }
                }

            }
        },

        handlePlugin: function (data, plugin) {
            var pluginId = plugin.pluginid;
            var params = plugin.params;
            var inputIds = plugin.inputids;
            var outputIds = plugin.outputids;

            var inputs = [];
            if (inputIds && inputIds.length > 0) {
                for (var i = 0; i < inputIds.length; i++) {
                    var elemOnForm = undefined;
                    var target = document.getElementById(inputIds[i].field);
                    if (target !== null) {
                        elemOnForm = $(target);
                    }
                    var elem = { element: elemOnForm, parameterName: inputIds[i].input, field: inputIds[i].field, actualfield: inputIds[i].actualfield };
                    if (elem) {
                        inputs.push(elem)
                    }
                }
            }

            var outputs = [];
            if (outputIds && outputIds.length > 0) {
                for (var i = 0; i < outputIds.length; i++) {
                    var elem = $(document.getElementById(outputIds[i]))
                    if (elem) {
                        outputs.push(elem)
                    }
                }
            }

            sb.notify({
                type: 'pluginid-2',
                data: { inputs: inputs, outputs: outputs, originInput: data.input, origin: data.origin, pluginData: plugin }
            });
        },

        destroy: function () {
            sb.ignore(['input-arbiter']);
            me = null;            
        }
    };
};

CORE.create_module("input-arbiter", talamasca.modules.inputArbiter);