
talamasca.modules.executeOnload = function (sb) {
    var me;
    var outputElements;

    function executeNoInputs(id, plugins) {
        sb.notify({
            type: 'input-arbiter',
            data: {
                input: "",
                origin: id,
                plugins: plugins
            }

        });
    }

    function executeWithExistingInputs(element) {
        var pluginToExecute = element.data('plugins').filter(function (item) {
            return item.outputids.indexOf(element[0].id) != -1;
        })[0];

        var numberOfInput = pluginToExecute.inputids.length;        
        var input;
        var value;

        if (numberOfInput == 0) {
            executeNoInputs(element[0].id, [pluginToExecute])
        }
        else {
            var values = [];

            for (var i = 0; i < numberOfInput; i++) {
                input = $("#" + pluginToExecute.inputids[i].field);
                var fieldType = talamasca.pluginServices.getFieldType(input);
                if (fieldType) {
                    value = talamasca.inputExtractors[fieldType](input);
                    values.push(value);
                    checkNotify(values, numberOfInput, input[0].id, [pluginToExecute]);
                }
                else {
                    talamasca.inputExtractors['sharepoint'](pluginToExecute.inputids[i].actualfield, null).then(
                           function (value, param) {
                               values.push(value);
                               checkNotify(values, numberOfInput, [pluginToExecute]);
                           },
                           function (sender, args, param) {
                               alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                               values.push("");
                               checkNotify(values, numberOfInput, [pluginToExecute]);
                           }
                       );
                }
            }
            
        }
    }

    function checkNotify(values, numberOfInput, data) {
        if (values.length == numberOfInput) {
            notifyInput(values, numberOfInput, data);
        }
    }

    function notifyInput(values, numberOfInput, data) {
        var inputsWithValue = 0;
        var value;

        for (var i = 0; i < values.length; i++) {
            value = values[i];
            if (value !== "" && value !== null && value !== undefined) {
                inputsWithValue++;
            }
        }

        if (inputsWithValue === numberOfInput) {
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: 0, plugins: data }
            });
        }
    }

    return {
        init: function (elements) {
            var element;
            var i;
            me = this;
            outputElements = elements || [];

            for (i = 0; i < outputElements.length; i++) {

                element = $(elements[i]);
                executeWithExistingInputs(element);
            }
        },

        destroy: function () {
            me = null;
        }
    };
}

CORE.create_module("execute-onload", talamasca.modules.executeOnload);