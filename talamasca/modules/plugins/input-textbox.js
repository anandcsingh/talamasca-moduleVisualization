talamasca.modules.inputTextbox = function (sb) {
    var me;
    var textbox;
    var jqElement;

    return {
        init: function (element) {
            me = this;
            textbox = element;

            if (textbox) {
                jqElement = $(textbox);
                sb.addEvent(jqElement, "change", me.textboxChanged);
                sb.addEvent(jqElement, "keyup", me.textboxChanged);
            }
        },

        textboxChanged: function (data) {
            sb.notify({
                type: 'input-arbiter',
                data: { input: jqElement.val(), origin: textbox.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(jqElement, "change", me.textboxChanged);
            sb.removeEvent(jqElement, "keyup", me.textboxChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-textbox", talamasca.modules.inputTextbox);