Ext.define('App.home.HomeView', {
    extend: 'Ext.panel.Panel',
    title: 'Home2',
    requires: ['App.home.HomeController'],
    controller: 'home',
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
    }
});

