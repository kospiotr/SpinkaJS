Ext.define('Ext.ux.UploadingWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploading-window',
    uploading: function () {
        var me = this;
        var form = this.lookupReference('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: 'rest/scientist/import',
                waitMsg: 'Uploading records...',
                success: function (form, action) {
                    console.log('success');
                    me.fireEvent('notification', action.result.msg);
                    me.fireViewEvent('importingdone');
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failure', 'An exception has occured while importing file.');
                }
            });
        }
    }
});