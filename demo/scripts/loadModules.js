angular.module('demoApp')
.value('Modules', <%= JSON.stringify(config.modules, null, 4) %>);
