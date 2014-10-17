Ext.define('App.scientists.ScientistsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.scientists',
  control: {
    grid:{
      rowdblclick: function (grid, record, tr, rowIndex, e, eOpts ) {
        this.getView().fireEvent('openRecord', record);
      }
    }
  },
  onSearchClick: function(){
    this.view.lookupComponent('gridId').store.load();
  }

});