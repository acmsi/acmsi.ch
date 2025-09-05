// Custom preview template for tags collection
// This creates a rich preview showing which articles use each tag

console.log('🔧 Loading custom preview template...')

// Check if CMS is available
if (typeof CMS === 'undefined') {
  console.error('❌ CMS not available when loading preview template')
} else {
  console.log('✅ CMS object is available')
}

// Use global createClass and h functions (available in Decap CMS)
console.log('createClass available:', typeof createClass !== 'undefined')
console.log('h available:', typeof h !== 'undefined')

// Simple preview template using Decap CMS globals
var TagPreview = createClass({
  getInitialState: function () {
    return {
      relatedArticles: [],
      loading: true,
    }
  },

  componentDidMount: function () {
    this.fetchRelatedArticles()
  },

  componentDidUpdate: function (prevProps) {
    var tagName = this.props.entry.getIn(['data', 'name'])
    var prevTagName = prevProps.entry.getIn(['data', 'name'])

    if (tagName !== prevTagName) {
      this.fetchRelatedArticles()
    }
  },

  fetchRelatedArticles: function () {
    var tagName = this.props.entry.getIn(['data', 'name'])

    if (!tagName) {
      this.setState({ loading: false, relatedArticles: [] })
      return
    }

    this.setState({ loading: true })

    // Fetch all actualités and filter by this tag
    this.props
      .getCollection('actualites')
      .then(
        function (articles) {
          var related = articles.filter(function (article) {
            var articleData = article.get('data')
            var dataObj = articleData.toJS ? articleData.toJS() : articleData
            var tags = dataObj.tags

            if (!tags || !Array.isArray(tags)) return false

            return tags.includes(tagName)
          })

          this.setState({
            relatedArticles: related,
            loading: false,
          })
        }.bind(this),
      )
      .catch(
        function (err) {
          console.error('Error fetching articles:', err)
          this.setState({ loading: false })
        }.bind(this),
      )
  },

  render: function () {
    var entry = this.props.entry
    var tagName = entry.getIn(['data', 'name'])
    var tagDescription = entry.getIn(['data', 'description'])
    var relatedArticles = this.state.relatedArticles
    var loading = this.state.loading

    if (!tagName) {
      return h(
        'div',
        { style: { padding: '20px', color: '#666' } },
        "Entrez un nom de tag pour voir l'aperçu...",
      )
    }

    var articlesSection = !loading
      ? h('div', { key: 'articles' }, [
          h(
            'h3',
            {
              key: 'articles-title',
              style: {
                marginTop: '0',
                marginBottom: '16px',
                color: '#1f2937',
                fontSize: '18px',
              },
            },
            'Articles utilisant ce tag :',
          ),

          relatedArticles.length > 0
            ? h(
                'ul',
                {
                  key: 'articles-list',
                  style: {
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                  },
                },
                relatedArticles.map(function (article, index) {
                  var articleData = article.get('data')
                  var dataObj = articleData.toJS
                    ? articleData.toJS()
                    : articleData
                  var slug = article.get('slug')
                  var title = dataObj.title
                  var author = dataObj.author
                  var date = dataObj.date

                  return h(
                    'li',
                    {
                      key: slug || index,
                      style: {
                        padding: '12px 16px',
                        marginBottom: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      },
                    },
                    [
                      h(
                        'div',
                        {
                          key: 'article-title',
                          style: { marginBottom: '4px' },
                        },
                        [
                          h(
                            'a',
                            {
                              key: 'article-link',
                              href: '/actualites/' + slug,
                              target: '_blank',
                              style: {
                                color: '#2563eb',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                              },
                            },
                            title,
                          ),
                          h(
                            'span',
                            {
                              key: 'external-icon',
                              style: {
                                marginLeft: '6px',
                                color: '#9ca3af',
                                fontSize: '12px',
                              },
                            },
                            '↗',
                          ),
                        ],
                      ),

                      h(
                        'div',
                        {
                          key: 'article-meta',
                          style: {
                            fontSize: '12px',
                            color: '#6b7280',
                          },
                        },
                        'Par ' +
                          (author || 'ACMSI') +
                          (date
                            ? ' • ' + new Date(date).toLocaleDateString('fr-CH')
                            : ''),
                      ),
                    ],
                  )
                }),
              )
            : h(
                'p',
                {
                  key: 'no-articles',
                  style: {
                    color: '#6b7280',
                    fontStyle: 'italic',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                  },
                },
                "Aucun article n'utilise encore ce tag",
              ),
        ])
      : null

    return h(
      'div',
      {
        style: {
          padding: '20px',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '800px',
        },
      },
      [
        // Header
        h(
          'div',
          {
            key: 'header',
            style: {
              borderBottom: '2px solid #e1e5e9',
              paddingBottom: '16px',
              marginBottom: '20px',
            },
          },
          [
            h(
              'h1',
              {
                key: 'title',
                style: {
                  margin: '0 0 8px 0',
                  color: '#1f2937',
                  fontSize: '24px',
                },
              },
              'Tag: "' + tagName + '"',
            ),

            tagDescription
              ? h(
                  'p',
                  {
                    key: 'desc',
                    style: {
                      margin: '0',
                      color: '#6b7280',
                      fontSize: '14px',
                    },
                  },
                  tagDescription,
                )
              : null,
          ],
        ),

        // Link to filtered page
        h(
          'div',
          {
            key: 'link',
            style: {
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#ecfccb',
              border: '1px solid #bef264',
              borderRadius: '8px',
            },
          },
          [
            h(
              'div',
              {
                key: 'link-title',
                style: {
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#365314',
                },
              },
              '🔗 Voir les articles filtrés',
            ),

            h(
              'a',
              {
                key: 'link-url',
                href: '/actualites?tag=' + encodeURIComponent(tagName),
                target: '_blank',
                style: {
                  color: '#16a34a',
                  textDecoration: 'underline',
                  fontSize: '16px',
                  fontWeight: '500',
                },
              },
              '/actualites?tag=' + tagName + ' →',
            ),
          ],
        ),

        // Usage statistics
        h(
          'div',
          {
            key: 'stats',
            style: {
              marginBottom: '24px',
              padding: '12px 16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
            },
          },
          loading
            ? '⏳ Chargement des statistiques...'
            : '📊 Utilisé par ' +
                relatedArticles.length +
                ' article' +
                (relatedArticles.length !== 1 ? 's' : ''),
        ),

        // List of related articles
        articlesSection,

        // Helpful tips
        h(
          'div',
          {
            key: 'tips',
            style: {
              marginTop: '32px',
              padding: '16px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fed7aa',
              borderRadius: '8px',
            },
          },
          [
            h(
              'h4',
              {
                key: 'tips-title',
                style: {
                  margin: '0 0 8px 0',
                  color: '#92400e',
                  fontSize: '14px',
                  fontWeight: '600',
                },
              },
              '💡 Conseils',
            ),

            h(
              'ul',
              {
                key: 'tips-list',
                style: {
                  margin: '0',
                  paddingLeft: '16px',
                  color: '#92400e',
                  fontSize: '13px',
                },
              },
              [
                h(
                  'li',
                  { key: 'tip1' },
                  'Utilisez des noms de tags cohérents pour éviter les doublons',
                ),
                h(
                  'li',
                  { key: 'tip2' },
                  'Les tags avec espaces fonctionnent correctement dans les URLs',
                ),
                h(
                  'li',
                  { key: 'tip3' },
                  'Cliquez sur le lien ci-dessus pour tester le filtre en live',
                ),
              ],
            ),
          ],
        ),
      ],
    )
  },
})

// Register the custom preview template
CMS.registerPreviewTemplate('tags', TagPreview)

console.log('✅ Custom tag preview template registered')
