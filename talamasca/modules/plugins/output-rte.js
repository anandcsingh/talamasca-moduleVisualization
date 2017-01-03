CORE.create_module("output-rte", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-rte': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var target = $(data.target);

                    if (talamasca.readonly.isEditable(target)) {
                        target.summernote('code', data.value);
                    }
                    else {                        
                        target.find("input").val(data.value);
                        target.find(".rte-label").html(data.value);
                    }                   
                }
               talamasca.loading.hideMessage(data.target);
            }
        },

        destroy: function () {
            sb.ignore(['output-rte']);
            me = null;            
        }
    };
});