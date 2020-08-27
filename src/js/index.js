// TODO: retrieve the secured_api_key  

function searchContacts(app_id, search_key) {
    const searchClient = '' // TODO: Add the Algolia search Client
      
    const search = instantsearch({
        indexName: 'contacts',
        searchClient,
        routing: true,
    });
      
    search.addWidgets([
        instantsearch.widgets.configure({
            hitsPerPage: 10,
        })
    ]);
      
    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: 'Search for contacts',
        })
    ]);
      
    search.addWidgets([
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: document.getElementById('hit-template').innerHTML,
                empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
            },
        })
    ]);
    
    search.start();
}

