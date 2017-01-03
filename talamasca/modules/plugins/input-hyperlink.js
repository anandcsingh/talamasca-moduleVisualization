talamasca.modules.inputHyperlink = function (sb) {
    var me;
    var textbox;
    var linkDiv;
    var jqElement;

    return {
        init: function (element) {
            me = this;
            linkDiv = element;

            if (linkDiv) {
                jqElement = $(linkDiv);
                textbox = jqElement.find('input:visible').first();

                sb.addEvent(textbox, "change", me.textboxChanged);
                sb.addEvent(textbox, "keyup", me.textboxChanged);
            }
        },

        textboxChanged: function (data) {
            var value = talamasca.inputExtractors['hyperlink'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: linkDiv.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(textbox, "change", me.textboxChanged);
            sb.removeEvent(textbox, "keyup", me.textboxChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-hyperlink", talamasca.modules.inputHyperlink);