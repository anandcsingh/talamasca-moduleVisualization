CORE.create_module("output-people", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-people': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var elementName = $(data.target).data("fieldname");

                    if (talamasca.readonly.isEditable($(data.target))) {
                        var hiddenField = $("[id='pp_resolvedUsers_" + elementName + "']");
                        if (hiddenField) {
                            hiddenField.val(data.value);
                            initiatePeoplePicker(elementName, data.target, me.setPeoplePicker);
                        }
                    }
                    else {
                        var input = $(data.target).find('input');
                        if (input) {
                            input.val(data.value);
                            input.trigger('change');
                        }

                        var fieldType = $(data.target).data("fieldtype");

                        var label = talamasca.readonly.pplLabel(data.target, fieldType);                        

                        if ($(data.target).children().length == 1) {
                            $(data.target).prepend(label);
                        }

                        var fieldConfig = FieldConfig.FieldConfigFactory.FieldConfig(fieldType, "");

                        if (fieldConfig != null) {
                            fieldConfig.init($(data.target), null);
                        }
                    }
                }
               talamasca.loading.hideMessage(data.target);
            }
        },

        setPeoplePicker: function(picker) {
        },

        destroy: function () {
            sb.ignore(['output-people']);
            me = null;            
        }
    };
});