module.exports = {
    title: '苏伊士学习笔记',
    description: '前端技术文档',
    head: [
        ['link', { rel: 'icon', href: '/head.png' }]
    ],
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '/head.png',
        sidebarDepth: 2,
        lastUpdated: '上次更新',
        nav: [
            { text: '首页', link: '/' },
            { text: '笔记', link: '/guide/getstart.md' },
            {
                text: '我的码云',
                link: 'https://gitee.com/fekers/technical-documentation'
            }
        ],
        extractHeaders: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        sidebar: {
            '/guide/': [
                'getstart',
                'ts',
                'ts-mark',
                'vue3',
                'esey',
                'web',
                'Selection',
                'wechat'
            ]
        }
    }
};