CORE.create_module("output-daterange", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-daterange': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var elementName = $(data.target).data("fieldname");
                    var format = $("[id='" + elementName + "_DateFormat']").val();
                    var dateFormat = format ? format : 'dd/mm/yy';

                    if (talamasca.readonly.isEditable($(data.target))) {
                        var children = $(data.target).find('input:visible');
                        if (children && children.length > 0) {
                            for (var i = 0; i < children.length; i++) {
                                var date = new Date(data.value[i]);

                                $(children[i]).val($.datepicker.formatDate(dateFormat, date));
                                $(children[i]).trigger('change');
                            }
                        }
                    }
                    else {
                        if (data.value.length >= 2) {
                            var fromDate = new Date(data.value[0]);
                            var formattedFromDate = $.datepicker.formatDate(dateFormat, fromDate);

                            var toDate = new Date(data.value[1]);
                            var formattedToDate = $.datepicker.formatDate(dateFormat, toDate);

                            var labels = $(data.target).find('label');

                            if (labels.length >= 2) {
                                var fromDiv = $(labels[0]).parent();
                                var toDiv = $(labels[1]).parent();

                                fromDiv.find("input").val(formattedFromDate);
                                talamasca.readonly.addLabel(fromDiv, formattedFromDate);

                                toDiv.find("input").val(formattedToDate);
                                talamasca.readonly.addLabel(toDiv, formattedToDate);
                            }
                        }
                    }
                    talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-daterange']);
            me = null;            
        }
    };
});