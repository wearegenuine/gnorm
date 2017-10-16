const src = './app';
const dest = './build';

module.exports = {
  app: './app',
  build: './build',
  browserSync: {
    ui: false,
    server: false,
    open: false,
    reloadDelay: 500,
    notify: false, //hide the annoying notification
    files: [
      dest + '/**',
      // Exclude Map files
      '!' + dest + '/**.map'
    ]
  },
  favicon: {
    src: src + '/favicon.ico',
    dest: dest
  },
  fonts: {
    src: src + '/fonts/**',
    dest: dest + '/fonts'
  },
  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },
  scripts: {
    all: src + '/scripts/**/*.js',
    modules: src + '/scripts/modules',
    src: src + '/scripts/app.js',
    dest: dest + '/scripts',
    libsSrc: src + '/scripts/libs/**/*.js',
    libsDest: dest + '/scripts/libs/',
    uglifyOptions: {
      mangle: true,
      compress: {
        sequences: true,
        properties: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: false,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        global_defs: {
          DEBUG: false
        }
      }
    }
  },
  styles: {
    src: src + '/styles/**/*.{sass,scss}',
    dest: dest + '/styles'
  },
  twig: {
    watchSrc: [
      src + '/*.twig',
      src + '/**/*.twig',
      src + '/json/*.json'
    ],
    source: 'app',
    pattern: 'app/*.twig',
    dest: 'build',
    data: 'app/json',
    namespaces: {
      includes: 'app/includes'
    },
    global: 'app/json/global.json',
    vendor: './vendor'
  }
}
