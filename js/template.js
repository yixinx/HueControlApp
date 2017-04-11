var groupsTemplate = `<table class='table table-striped'>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
  {{#1}}
    <tr><td>name</td><td>{{name}}</td></tr>
    <tr><td>type</td><td>{{type}}</td></tr>
    <tr><td>lights</td><td>{{lights}}</td></tr>
    <tr><td>class</td><td>{{class}}</td></tr>
    <tr><td>all on</td><td>{{state.all_on}}</td></tr>
    <tr><td>any on</td><td>{{state.any_on}}</td></tr>
    {{/1}}
  </tbody>
</table>`;

var lightsTemplate = `<table class="table table-striped">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
  {{#3}}
    <tr><td>state</td><td>{{state.on}}</td></tr>
    <tr><td>brightness</td><td>{{state.bri}}</td></tr>
    <tr><td>name</td><td>{{name}}</td></tr>
    <tr><td>type</td><td>{{type}}</td></tr>
    <tr><td>modelid</td><td>{{modelid}}</td></tr>
    <tr><td>manufacturername</td><td>{{manufacturername}}</td></tr>
    {{/3}}
  </tbody>
</table>`;