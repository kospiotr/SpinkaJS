Ext.application({
	name: 'App',
	namespaces: ['App'],
	requires: ['App.ViewportView'],
//	requires: ['App.scientists.ScientistStore'],
	autoCreateViewport: 'App.ViewportView',
	glyphFontFamily: 'Pictos'
});