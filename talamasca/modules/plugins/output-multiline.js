CORE.create_module("output-multiline", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-multiline': me.processData
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
                        target.find(".multiline-label").html(value.replace(/\n/g, '<br />'));
                    }

                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-multiline']);
            me = null;
        }
    };
});