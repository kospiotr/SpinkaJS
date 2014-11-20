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
                    fieldLabel: 'Select file',
                    xtype: 'filefield',
                    reference: 'file',
                    
                }
            ]
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'upload',
            handler: 'uploading'
        }
    ]
});