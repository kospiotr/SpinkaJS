Ext.define('Ext.ux.UploadingWindow', {
    extend: 'Ext.window.Window',
    requires: ['Ext.ux.UploadingWindowController'],
    controller: 'uploading-window',
    title: 'Importing records',
    modal: true,
    frame: true,
    bodyPadding: 5,
    bodyBorder: false,
    border: false,
    layout: 'fit',
    minWidth: 400,
    items: [
        {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyBorder: false,
            border: false,
            reference: 'form',
            items: [
                {
                    xtype: 'filefield',
                    name: 'file',
                    buttonText: 'Select file',
                }
            ]
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Upload',
            handler: 'uploading'
        }
    ]
});