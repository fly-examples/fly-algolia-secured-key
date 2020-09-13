fetch('/key').then(
  function (response) {
      if (response.ok) {
          response.json().then(function (data) {
              const secured_api_key = data.secured_api_key
              const algolia_app_id = data.algolia_app_id
              searchContacts(algolia_app_id, secured_api_key)
          });
      } else {
          throw new Error('Something went wrong');
      }
  }
).catch(function error (err) {
    console.log('An error occurred while fetching API Key', err)
});

function searchContacts(app_id, secured_key) {
    const searchClient = algoliasearch(
      app_id,
      secured_key // Secured API key, not admin API key
    );

    const search = instantsearch({
        indexName: 'contacts',
        searchClient,
        routing: true,
    });

    search.addWidgets([
        instantsearch.widgets.configure({
            hitsPerPage: 12,
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

