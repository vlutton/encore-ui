// this loads all the component controllers used in the demos
<% _.each(config.demoModules, function (module) { %>
<%= module.docs.js %>
<% }); %>