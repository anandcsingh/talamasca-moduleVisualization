talamasca.modules.inputCheckBoxList = function (sb) {
    var me;
    var checkDiv;
    var jqElement;
    var elements;

    return {
        init: function (element) {
            me = this;
            checkDiv = element;
            if (checkDiv) {
                jqElement = $(checkDiv);
            }
            var elementName = jqElement.data("fieldname");
            elements = $("[name='" + elementName + "']:visible");

            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    sb.addEvent(elements[i], "change", me.valueChanged);
                }
            }
        },

        valueChanged: function (data) {
            var list = talamasca.inputExtractors['checkboxlist'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: list, origin: checkDiv.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    sb.removeEvent(elements[i], "change", me.valueChanged);
                }
            }
            me = null;            
        }
    };
}

CORE.create_module("input-checkboxlist", talamasca.modules.inputCheckBoxList);