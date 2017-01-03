CORE.create_module("output-checkbox", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-checkbox': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var target = $(data.target);
                    var value = data.value;
                    var checked = false;

                    if (value !== null && value !== undefined) {
                        checked = value.toLowerCase() == "true" ? true : false;
                    }

                    if (talamasca.readonly.isEditable(target.parent())) {
                        target.val(checked);
                        target.prop("checked", checked);  
                    }
                    else {
                        var parent = target.parent();
                        parent.find("input[type='hidden']").val(checked);
                        parent.find("input[type='checkbox']").prop("checked", checked);
                    }
                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-checkbox']);
            me = null;            
        }
    };
});