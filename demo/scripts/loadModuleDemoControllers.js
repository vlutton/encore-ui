// this loads all the module controllers used in the demos
<% _.each(config.modules, function (module) { %>
<%= module.docs.js %>
<% }); %>
