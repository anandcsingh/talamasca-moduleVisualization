talamasca.pluginsExecutor = {
    addInputValue: function (info, inputValues) {
        inputValues[info.paramName] = info.inputVal;
        var inputCount = this.checkInputs(inputValues);
        if (inputCount == 0) {
            talamasca.errors.clear(info.targetElement);
        }
        this.checkExecute(info, inputValues, inputCount);
    },

    checkInputs: function (obj) {
        var proptCount = 0;
        for (var propt in obj) {
            if (obj[propt] !== null && obj[propt] !== undefined && $.trim(obj[propt]) !== "") {
                proptCount++
            }
        }
        return proptCount;        
    },

    checkExecute: function (info, inputValues, inputCount) {
        if (inputCount == info.data.inputs.length) {
            this.executePlugins(info.targetElement, info.data, inputValues, inputCount, info.sb);
        }
    },

    executePlugins: function (targetElement, data, inputValues, inputCount, sb) {
        var outputOnly = !(data.inputs && data.inputs.length > 0);

        var url = 'api/plugins/execute?operationId=' + data.pluginData.params.operationid;
        //var url = 'http://localhost:55106/js/talamasca/result.json';
        $.ajax({
            cache: false,
            type: 'POST',
            data: JSON.stringify(inputValues),
            url: url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            success: function (response) {

                talamasca.errors.clear(targetElement);

                var outputs = [];
                if (data.outputs && data.outputs.length === 1) {
                    outputs.push({ element: data.outputs[0], value: response.Value });
                }

                sb.notify({
                    type: 'output-notifier',
                    data: { result: outputs, pluginData: data.pluginData }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#pluginLoadMsg').hide();

                if (!outputOnly && inputCount == 0) {
                    talamasca.errors.clear(targetElement);
                }
                else {
                    var errSpan = $("<span>").addClass("pluginLoadError").html(" This Data Source threw an error.");
                    var nextSib = $(targetElement).next()
                    if (!(nextSib.is("span") && nextSib.hasClass("pluginLoadError"))) {
                        $(targetElement).after(errSpan);
                    }
                }
                console.log(xhr);
                console.log(thrownError);
            }
        });
    }
};