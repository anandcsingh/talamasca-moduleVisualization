CORE.create_module("output-label", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-label': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var target = $(data.target);
                    var readOnly = target.parent().find(".labelControl-label");
                    readOnly.html(data.value);
                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-label']);
            me = null;
        }
    };
});