talamasca.modules.inputDateRange = function (sb) {
    var me;
    var dateDiv;
    var jqElement;    
    var children;

    return {
        init: function (element) {
            me = this;
            dateDiv = element;
            if (dateDiv) {
                jqElement = $(dateDiv);
            }
            children = jqElement.find('input:visible');
            
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    sb.addEvent(children[i], "change", me.textboxChanged);
                }
            }
        },

        textboxChanged: function (data) {
            var dates = talamasca.inputExtractors['daterange'](jqElement);

            sb.notify({
                type: 'input-arbiter',
                data: { input: dates, origin: dateDiv.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    sb.removeEvent(children[i], "change", me.textboxChanged);
                }
            }
            me = null;            
        }
    };
}

CORE.create_module("input-daterange", talamasca.modules.inputDateRange);