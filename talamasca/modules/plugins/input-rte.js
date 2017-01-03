talamasca.modules.inputRte = function (sb) {
    var me;
    var textarea;
    var jqElement;

    return {
        init: function (element) {
            me = this;           
            textarea = element;

            if (textarea) {
                jqElement = $(textarea);
                jqElement.on('summernote.keyup', me.textareaChanged);
                jqElement.on('summernote.change', me.textareaChanged);
            }
        },

        textareaChanged: function (data) {
            var value = talamasca.inputExtractors['rte'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: textarea.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            //sb.removeEvent(jqElement, "change", me.textareaChanged);
            //sb.removeEvent(jqElement, "keyup", me.textareaChanged);
            me = null;
        }
    };
}

CORE.create_module("input-rte", talamasca.modules.inputRte);