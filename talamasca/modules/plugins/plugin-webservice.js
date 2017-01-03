CORE.create_module("pluginid-2", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'pluginid-2': me.processData
            });
        },

        processData: function (data) {
            var targetElement;
            var inputs;
            var inputValues;
            var i;
            var element;
            var actualField;
            var fieldType;
            var paramName;

            if (data) {
                                
                if (data.outputs && data.outputs.length == 1) {
                    targetElement = data.outputs[0];
                    inputs = talamasca.pluginServices.getInputs(targetElement);
                    if (!inputs || inputs.length == 0) {
                        $('#pluginLoadMsg').show();
                    }
                }

                var executor = talamasca.pluginsExecutor;
                var inputValues = {};
                if (data.inputs && data.inputs.length > 0) {
                    for (i = 0; i < data.inputs.length; i++) {
                        element = data.inputs[i].element;
                        actualField = data.inputs[i].actualfield;
                        paramName = data.inputs[i].parameterName;
                        var inputVal = "";
                        if (element !== null && element !== undefined) {
                            fieldType = talamasca.pluginServices.getFieldType(element);
                            inputVal = talamasca.inputExtractors[fieldType](element);
                            var info = {
                                paramName: paramName,
                                inputVal: inputVal,
                                data: data,
                                targetElement: targetElement,
                                sb: sb
                            };
                            executor.addInputValue(info, inputValues);
                        }
                        else {
                            talamasca.inputExtractors['sharepoint'](actualField, paramName).then(
                               function (value, param) {
                                   var info = {
                                       paramName: param,
                                       inputVal: value,
                                       data: data,
                                       targetElement: targetElement,
                                       sb: sb
                                   };
                                   executor.addInputValue(info, inputValues);
                               },
                               function (sender, args, param) {
                                   alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                                   var info = {
                                       paramName: param,
                                       inputVal: "",
                                       data: data,
                                       targetElement: targetElement,
                                       sb: sb
                                   };
                                   executor.addInputValue(info, inputValues);
                               }
                           );
                        }
                    }
                }
                else {
                    executor.executePlugins(targetElement, data, inputValues, 0, sb);
                     sb.notify({
                    type: 'output-notifier'
                });
                }
            }
        },        

        destroy: function () {
            sb.ignore(['pluginid-2']);
            me = null;            
        }
    };
});