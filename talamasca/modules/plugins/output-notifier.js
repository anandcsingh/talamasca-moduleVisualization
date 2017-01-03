CORE.create_module("output-notifier", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-notifier': me.notifyOutputModules
            });
        },

        notifyOutputModules: function (data) {
            if (data) {
                if (data.result && data.result.length > 0) {
                    for (var i = 0; i < data.result.length; i++) {
                        var targetElement = data.result[i].element;
                        if (targetElement) {
                            var fieldType = talamasca.pluginServices.getFieldType(targetElement);
                            sb.notify({
                                type: 'output-' + fieldType,
                                data: { target: targetElement, value: data.result[i].value}
                            });
                        }
                    }
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-notifier']);
            me = null;            
        }
    };
});