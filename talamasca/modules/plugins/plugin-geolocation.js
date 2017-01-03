CORE.create_module("pluginid-1", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'pluginid-1': me.processData
            });
        },

        processData: function (data) {
            if (data) {

                var output = "";

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        output = position.coords.latitude + ", " + position.coords.longitude;

                        var outputs = [];
                        if (data.outputs && data.outputs.length === 1) {
                            outputs.push({ element: data.outputs[0], value: output });
                        }

                        sb.notify({
                            type: 'output-notifier',
                            data: { result: outputs, pluginData: data.pluginData }
                        });
                    });
                }
                else {
                    //sb.notify({
                    //    type: 'output-notifier',
                    //    data: { result: 'Geolocation not supported by browser', target: data.target, origin: data.origin }
                    //});
                }
            }
        },

        destroy: function () {
            sb.ignore(['pluginid-1']);
            me = null;            
        }
    };
});