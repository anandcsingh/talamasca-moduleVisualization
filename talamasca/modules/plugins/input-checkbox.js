talamasca.modules.inputCheckbox = function (sb) {
    var me;
    var box;
    var jqElement;

    return {
        init: function (element) {
            me = this;
            box = element;

            if (box) {
                jqElement = $(box);
                sb.addEvent(jqElement, "change", me.checkChanged);
            }
        },

        checkChanged: function (data) {
            var value = talamasca.inputExtractors['checkbox'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: box.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(jqElement, "change", me.checkChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-checkbox", talamasca.modules.inputCheckbox);