/**
 * Tailwind CSS 配置文件
 * 定义站点的主题、颜色、排版等样式配置
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // 启用暗黑模式
  darkMode: 'class',
  // 内容配置 - 指定Tailwind应该分析哪些文件以生成所需的CSS
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // 源码文件
    "./public/**/*.html"            // 公共HTML文件
  ],
  theme: {
    extend: {
      // 颜色配置 - 自定义主题色阶
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // 主色调
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      // 尺寸配置 - 扩展最大宽度选项
      maxWidth: {
        '8xl': '88rem',  // 自定义超大宽度
      },
      // 排版配置 - 用于@tailwindcss/typography插件
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',  // 移除默认最大宽度限制
            color: 'inherit',  // 继承颜色
            // 链接样式定制
            a: {
              color: '#0ea5e9',  // 链接颜色与primary-500一致
              textDecoration: 'none',  // 移除下划线
              '&:hover': {
                color: '#0284c7',  // 悬停时使用deeper颜色
              },
            },
            // 标题样式定制
            'h1, h2, h3, h4': {
              color: '#111827',  // 近黑色
              fontWeight: '600',  // 加粗
            },
            // 代码样式定制
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',  // 浅灰背景
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            // 移除默认的代码块前后引号
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
        // 暗黑模式排版配置
        dark: {
          css: {
            color: '#e5e7eb', // 浅灰色文本
            // 暗黑模式下的标题样式
            'h1, h2, h3, h4': {
              color: '#f3f4f6', // 浅色标题
            },
            // 暗黑模式下的链接样式
            a: {
              color: '#38bdf8', // 暗黑模式下链接颜色
              '&:hover': {
                color: '#7dd3fc', // 暗黑模式下悬停颜色
              },
            },
            // 暗黑模式下的代码样式
            code: {
              color: '#f3f4f6',
              backgroundColor: '#1f2937', // 深色背景
            },
          },
        },
      },
    },
  },
  // 插件配置
  plugins: [
    require('@tailwindcss/typography'),  // 启用排版插件，用于美化Markdown内容
  ],
} 