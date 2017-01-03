talamasca.modules.inputRadioButtonList = function (sb) {
    var me;
    var radioDiv;
    var jqElement;
    var elements;

    return {
        init: function (element) {
            me = this;
            radioDiv = element;
            if (radioDiv) {
                jqElement = $(radioDiv);
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
            var value = talamasca.inputExtractors['radiobuttonlist'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: radioDiv.id, plugins: jqElement.data('plugins') }
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

CORE.create_module("input-radiobuttonlist", talamasca.modules.inputRadioButtonList);