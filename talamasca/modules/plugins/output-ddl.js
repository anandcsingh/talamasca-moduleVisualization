CORE.create_module("output-ddl", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-ddl': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    if (!$.isArray(data.value)) {
                        if (talamasca.readonly.isEditable($(data.target))) {
                            var valueExist = $(data.target).find("option[value='" + data.value + "']").length > 0;
                            if (valueExist) {
                                $(data.target).val(data.value);
                            }
                        }
                        else {
                            $(data.target).find("input").val(data.value);
                            talamasca.readonly.addLabel(data.target, data.value);
                        }                        
                    }
                    else {
                        if (!$(data.target).hasClass("readOnlyCtrl")) {
                            if (data.value.length > 0) {
                                var elementName = $(data.target).data('fieldname');
                                $("select[name='" + elementName + "'] > option:gt(0)").remove();
                                for (i = 0; i < data.value.length; i++) {
                                    $(data.target)
                                         .append($("<option></option>")
                                         .attr("value", data.value[i])
                                         .text(data.value[i]));
                                }
                            }
                        }
                    }
                   talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-ddl']);
            me = null;            
        }
    };
});