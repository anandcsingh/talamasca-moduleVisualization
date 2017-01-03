CORE.create_module("pluginid-0", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'pluginid-0': me.processData
            });
        },

        processData: function (data) {
            if (data) {

                var input;
                if (data.inputs && data.inputs.length === 1) {
                    input = data.inputs[0];
                }

                var processedInput = input.val().toUpperCase();

                var outputs = [];
                if (data.outputs && data.outputs.length === 1) {
                    outputs.push({ element: data.outputs[0], value: processedInput });
                }

                sb.notify({
                    type: 'output-notifier',
                    data: { result: outputs, pluginData: data.pluginData }
                });
            }
        },

        destroy: function () {
            sb.ignore(['pluginid-0']);
            me = null;            
        }
    };
});