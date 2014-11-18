Ext.define('App.home.HomeView',{
    extend: 'Ext.panel.Panel',
    title: 'Home2',
    requires: ['App.home.HomeController'],
    controller: 'home',
    layout: 'column',
    autoScroll: true,
    defaults: {
        margin: 5
    },
    initComponent: function(){
        var items = [];
        for(var i = 50; i < 200; i++){
            var button = Ext.create('Ext.Button', {text: i, glyph: i, 
//                scale: 'large'
            });
            items.push(button);
            console.log(i);
        }
        this.items = items;
        this.callParent();
        console.log('initialized home');
    }
});

