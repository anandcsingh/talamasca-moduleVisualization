talamasca.modules.inputDate = function (sb) {
    var me;
    var textbox;
    var jqElement;

    return {
        init: function (element) {
            me = this;
            if (element) {
                jqElement = $(element);

                textbox = jqElement.find('input:visible')[0];
                sb.addEvent(textbox, "change", me.textboxChanged);
            }            
        },

        textboxChanged: function (data) {
            var dateTime = talamasca.inputExtractors['date'](jqElement);
            sb.notify({
                type: 'input-arbiter',
                data: { input: dateTime, origin: textbox.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(textbox, "change", me.textboxChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-date", talamasca.modules.inputDate);