// TODO 5: retrieve the secured_api_key  

function searchContacts(app_id, search_key) {
    const searchClient = algoliasearch(
        app_id,
        search_key // search only API key, not admin API key
    );
      
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
        }),
        instantsearch.widgets.pagination({
            container: '#pagination',
        }),
    ]);
    
    search.start();
}

