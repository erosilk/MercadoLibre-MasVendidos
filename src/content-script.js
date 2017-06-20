/* global chrome document */
/* eslint no-undef: "error" */
/* global fetch:false */

chrome.runtime.sendMessage('getState', state => {
  if (state) {
    sortItems()
  }
})

function sortItems() {
  // Check if active view mode is List or Gallery mode
  const listSelector = '#searchResults'
  const rowItems = [...document.querySelectorAll('.results-item')]
  const IDs = rowItems.map(item => item.innerHTML.match(/(MLA)[0-9]+/i)[0])
  const itemsSold = []

  // Get all sold quantities and push them to an array.
  IDs.forEach(id => {
    getSold(id, (id, quantity) => {
      itemsSold.push(id)
      itemsSold.push(quantity)
      sort()
    })
  })

  // Async function that fetches Mercadolibre's API for sold quantities info.
  function getSold(id, cb) {
    fetch('https://api.mercadolibre.com/items/' + id).then(x => x.json().then(j => cb(j.id, j.sold_quantity)))
  }

  function sort() {
    if (IDs.length === itemsSold.length / 2) {
      // Sort all the quantity of sold products descendly
      const rowItemsSorted = rowItems.slice().sort((a, b) => {
        const valueA = itemsSold[itemsSold.indexOf(a.firstElementChild.id) + 1]
        const valueB = itemsSold[itemsSold.indexOf(b.firstElementChild.id) + 1]
        return valueA - valueB
      })

      // Clean all items inside the list
      const listView = document.querySelector(listSelector)
      listView.innerHTML = null

      // Insert all the items sorted descendly
      rowItemsSorted.forEach(row => listView.insertAdjacentElement('afterbegin', row))
    }
  }
}
