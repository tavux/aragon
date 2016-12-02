Template.module_ownership.created = function () {
  TemplateVar.set('state', 'module_ownershipEmpty')
}

Template.module_ownership.events({
  "click button#issueShares": () => {
    TemplateVar.set('state', 'module_ownershipIssueShares')
  }
})

Template.module_ownership.helpers({
  state: () => (TemplateVar.get('state'))
})
