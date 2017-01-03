talamasca.modules.inputPeoplePicker = function (sb) {
    var me;
    var pplDiv;
    var jqElement;
    var elementName;
    var hiddenField;

    return {
        init: function (element) {
            me = this;
            pplDiv = element;

            if (pplDiv) {
                jqElement = $(pplDiv);
                elementName = jqElement.data("fieldname");
                
                hiddenField = $("[id='pp_resolvedUsers_" + elementName + "']");
                sb.addEvent(hiddenField, "change", me.textboxChanged);
            }
        },

        textboxChanged: function (data) {
            var userlist = talamasca.inputExtractors['people'](jqElement);
             
            sb.notify({
                type: 'input-arbiter',
                data: { input: userlist, origin: pplDiv.id, plugins: jqElement.data('plugins') }
            });
        },

        destroy: function () {
            sb.removeEvent(hiddenField, "change", me.textboxChanged);
            me = null;            
        }
    };
}

CORE.create_module("input-people", talamasca.modules.inputPeoplePicker);