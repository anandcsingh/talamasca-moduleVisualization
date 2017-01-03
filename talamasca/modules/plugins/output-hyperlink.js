CORE.create_module("output-hyperlink", function (sb) {
    var me;

    return {
        init: function () {
            me = this;
            sb.listen({
                'output-hyperlink': me.processData
            });
        },

        processData: function (data) {
            if (data) {
                if (data.target) {
                    var target = $(data.target);

                    if (talamasca.readonly.isEditable(target)) {
                        var childElements = target.find('input:visible');
                        for (var i = 0; i < childElements.length; i++) {
                            $(childElements[i]).val(data.value);
                            $(childElements[i]).trigger('change');
                        }
                    }
                    else {
                        var value = data.value;
                        target.find("input").val(value + "," + value);
                        target.find('a').attr('href', value).html(value);
                    }
                    
                   talamasca.loading.hideMessage(data.target);
                }
            }
        },

        destroy: function () {
            sb.ignore(['output-hyperlink']);
            me = null;            
        }
    };
});