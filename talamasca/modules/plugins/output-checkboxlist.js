CORE.create_module("output-checkboxlist", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-checkboxlist': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var targetElement;
                    var elementName;
                    targetElement = $(data.target);

                    if (!$.isArray(data.value)) {

                        if (talamasca.readonly.isEditable(targetElement)) {
                            elementName = targetElement.data("fieldname");
                            var choosenValue = $("[name='" + elementName + "']:visible[value='" + data.value + "']");
                            if (choosenValue) {
                                choosenValue.prop("checked", true);
                            }
                        }
                        else {
                            $(data.target).find("input").val(data.value);
                            talamasca.readonly.addLabel(data.target, data.value);
                        }
                    }
                    else {
                        if (talamasca.readonly.isEditable(targetElement)) {
                            elementName = $(data.target).data("fieldname");
                            var elements = $("[name='" + elementName + "']:visible");
                            if (elements) {
                                for (i = 0; i < elements.length; i++) {
                                    var element = elements[i];
                                    var parentDiv = $(element).parent().parent();
                                    var labelDiv = parentDiv.after();

                                    targetElement = parentDiv.parent();
                                    labelDiv.remove();
                                    parentDiv.remove();
                                }
                            }

                            if (data.value.length > 0 && targetElement) {
                                for (i = 0; i < data.value.length; i++) {
                                    var content = '<div>' +
                                                    '<span style="display:inline-block">' +
                                                        '<input id="' + elementName + '" name="' + elementName + '" type="checkbox" value="' + data.value[i] + '">' +
                                                    '</span>' +
                                                    '<span style="display:inline-block">' +
                                                        '<label for="' + data.value[i] + '" class="qwformlabel"> ' + data.value[i] + '</label>' +
                                                    '</span>' +
                                                  '</div>';
                                    $(targetElement).append(content);
                                }
                            }
                        }

                    }
                }
                talamasca.loading.hideMessage(data.target);
            }
        },

        destroy: function () {
            sb.ignore(['output-checkboxlist']);
            me = null;
        }
    };
});