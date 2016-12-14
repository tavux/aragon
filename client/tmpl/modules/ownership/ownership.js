import StockWatcher from '/client/lib/ethereum/stocks'
import { Stock } from '/client/lib/ethereum/contracts'
import Company from '/client/lib/ethereum/deployed'

const Stocks = StockWatcher.Stocks

const tmpl = Template.Module_Ownership.extend()

tmpl.routes({
  '/': () => TemplateVar.set('rightSection', 'Module_Ownership_Charts'),
  '/issue': () => TemplateVar.set('rightSection', 'Module_Ownership_IssueShares'),
  '/assign': () => TemplateVar.set('rightSection', 'Module_Ownership_AssignShares'),
  '/entity/:address': () => TemplateVar.set('rightSection', 'Module_Entity'),
})

tmpl.onCreated(() => {
  const rightSection = Stocks.find().count() ? 'Module_Ownership_Charts' : 'Module_Ownership_Empty'
  TemplateVar.set('rightSection', rightSection)
})

tmpl.onRendered(function () {
  this.$('table').tablesort()
})

tmpl.events({
  'input #searchInput': (e) => (TemplateVar.set('searchString', e.target.value)),
  'click tbody tr': (e) => FlowRouter.go(`/ownership/entity/${$(e.currentTarget).data('shareholder')}`),
  'close #entity': () => FlowRouter.go('/ownership'),
})

tmpl.helpers({
  stocks: () => Stocks.find(),
  updated: () => Stocks.findOne({}, { sort: { updated: -1 } }).updated,
  shareholders: ReactivePromise(() => (
    StockWatcher.allShareholders().then(x => [].concat(...x))
  )),
  balance: ReactivePromise((stock, shareholder) => (
    Stock.at(stock).balanceOf(shareholder).then(x => x.valueOf())
  )),
  company: () => Company.address,
})