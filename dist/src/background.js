"use strict";function checkIcon(e){var n=e?"assets/mercado-libre_128.png":"assets/mercado-libre-disabled_128.png";chrome.browserAction.setIcon({path:n})}var enabled=void 0;!function(){chrome.storage.sync.get({enabled:!0},function(e){enabled=e.enabled}),checkIcon()}(),chrome.extension.onMessage.addListener(function(e,n,c){"getState"===e?(c(enabled),checkIcon(enabled)):(enabled="Activar"===e,chrome.storage.sync.set({enabled:enabled}),checkIcon(enabled))});