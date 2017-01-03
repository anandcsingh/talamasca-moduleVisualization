CORE.create_module("output-date", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-date': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var date = new Date(data.value);
                    var elementName = $(data.target).data('fieldname');
                    var format = $("[id='" + elementName + "_DateFormat']").val();
                    var dateFormat = format ? format : 'dd/mm/yy';
                    var formattedDate = $.datepicker.formatDate(dateFormat, date);

                    if (talamasca.readonly.isEditable($(data.target))) {
                        var childElement = $(data.target).find('input:visible');
                        childElement.val(formattedDate);
                        childElement.trigger('change');
                    }
                    else {
                        $(data.target).find("input").val(formattedDate);
                        talamasca.readonly.addLabel(data.target, formattedDate);
                    }

                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-date']);
            me = null;            
        }
    };
});