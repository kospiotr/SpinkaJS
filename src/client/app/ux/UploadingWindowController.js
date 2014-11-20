Ext.define('Ext.ux.UploadingWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploading-window',
    uploading: function () {
        var me = this;
        console.log('Uploading from controller');
        var form = this.lookupReference('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: 'rest/scientist/import',
                waitMsg: 'Uploading records...',
                success: function (fp, o) {
                    me.getView().close();
                    me.fireEvent('notification', 'Records has been successfully imported');
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failure', 'An exception has occured while importing file.');
                }
            });
        }
    }
});