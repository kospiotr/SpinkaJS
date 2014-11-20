Ext.define('App.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    step: 1000,
    destroy: function () {
        console.log('destroying HomeController');
        this.callParent();
    },
    init: function () {
        this.update(this.current);
        this.getViewModel().bind('{current}', function (value) {
            this.update(value);
        }, this);
        this.callParent();
    },
    getCurrent: function () {
        return this.getViewModel().data.current;
    },
    updateCurrent: function (current) {
        this.getViewModel().setData({current: current});
    },
    update: function () {
        this.getView().removeAll();
        var items = [];
        for (var i = this.getCurrent(); i < this.getCurrent() + this.step; i++) {
            var button = Ext.create('Ext.Button', {text: i, glyph: i,
            });
            items.push(button);
        }
        this.getView().add(items);
    },
    _prev: function (step) {
        this.updateCurrent(this.getCurrent() - step);
        this.update();
    },
    _next: function (step) {
        this.updateCurrent(this.getCurrent() + step);
        this.update();
    },
    prev1: function () {
        this._prev(this.step);
    },
    next1: function () {
        this._next(this.step);
    },
    prev10: function () {
        this._prev(this.step * 10);
    },
    next10: function () {
        this._next(this.step * 10);
    },
    prev100: function () {
        this._prev(this.step * 100);
    },
    next100: function () {
        this._next(this.step * 100);
    },
});