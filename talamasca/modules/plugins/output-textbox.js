CORE.create_module("output-textbox", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-textbox': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var target = $(data.target);

                    if (talamasca.readonly.isEditable(target)) {
                        target.val(data.value);
                        target.trigger('change');
                    }
                    else {
                        var value = data.value;
                        target.find("input").val(value);
                        talamasca.readonly.addLabel(data.target, value);
                    }

                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-textbox']);
            me = null;
        }
    };
});