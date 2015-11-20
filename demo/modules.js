angular.module('demoApp')
.value('components', <%= JSON.stringify(config.components, null, 4) %>)
.value('modules', <%= JSON.stringify(config.modules, null, 4) %>);
