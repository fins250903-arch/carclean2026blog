module.exports = {
  collections_config: {
    blog: {
      path: 'src/content/blog',
      glob: '**/index.md',
      output: true,
      url: '/blog/[slug]',
      name: 'ブログ記事',
      _inputs: {
        title: {
          type: 'text',
          label: 'タイトル (Title)'
        },
        date: {
          type: 'date',
          label: '日付 (Date)'
        },
        categories: {
          type: 'multiselect',
          label: 'カテゴリー (Categories)',
          options: {
            allow_create: true
          }
        },
        coverImage: {
          type: 'image',
          label: 'サムネイル画像 (Cover Image)',
          options: {
            uploads: {
              paths: {
                uploads: 'public/posts',
                public: '/posts'
              }
            }
          }
        }
      }
    }
  }
};
