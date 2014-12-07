Ext.define('App.glyph.GlyphView', {
    extend: 'Ext.panel.Panel',
    title: 'GlyphBrowser',
    requires: ['App.glyph.GlyphController'],
    controller: 'glyph',
    layout: 'column',
    autoScroll: true,
    margin: 5,
    viewModel: {
        data: {
            current: 0
        }
    },
    defaults: {
        margin: 5
    },
    buttons: [
        {
            text: '< 1000',
            handler: 'prev100'
        },
        {
            text: '< 100',
            handler: 'prev10'
        },
        {
            text: '< 10',
            handler: 'prev1'
        },
        
        {
            xtype: 'textfield',
            bind: '{current}'
        },
        {
            text: '10 >',
            handler: 'next1'
        },
        {
            text: '100 >',
            handler: 'next10'
        },
        {
            text: '1000 >',
            handler: 'next100'
        }
    ],
});

