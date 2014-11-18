Ext.define('App.ViewportView', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    border: false,
    bodyBorder: false,
    id: 'viewport',
    tbar: {
        xtype: 'toolbar',
        border: false,
        style: {
            backgroundColor: '#157fcc'
        },
        items: [
            {id: 'homeButton', xtype: 'button', glyph: 72},
            {id: 'projectsButton', xtype: 'button', text: 'Projects', glyph: 77},
            {id: 'scientistsButton', xtype: 'button', text: 'Scientists', glyph: 85},
            {id: 'contractorsButton', xtype: 'button', text: 'Contractors', glyph: 85},
            '->',
            {xtype: 'textfield', text: 'Profile', emptyText: 'search ...'},
            {xtype: 'button', glyph: 42},
            {xtype: 'button', glyph: 117}
        ]
    },
    items:[
        {
            html: 'test',
            region: 'center'
        }
    ]
});