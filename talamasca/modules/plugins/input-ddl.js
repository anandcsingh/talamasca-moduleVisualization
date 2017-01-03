talamasca.modules.inputDdl = function (sb) {
    var me;
    var list;
    var jqElement;

    return {
        init: function (element) {
            me = this;
            list = element;

            if (list) {
                jqElement = $(list);
                sb.addEvent(jqElement, "change", me.listChanged);
            }
        },

        listChanged: function (data) {
            var value = talamasca.inputExtractors['ddl'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: value, origin: list.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(jqElement, "change", me.listChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-ddl", talamasca.modules.inputDdl);