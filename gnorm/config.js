const src = './app';
const dest = './build';

module.exports = {
  app: './app',
  build: './build',
  browserSync: {
    server: {
      // We're serving the src folder as well for sass sourcemap linking
      baseDir: [dest, src]
    },
    // hide the annoying notification
    notify: false,
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
    src: [
      src + '/styles/**/*.{sass,scss}',
      '!' + src + '/styles/variables.scss'
    ],
    dest: dest + '/styles'
  },
  twig: {
    src: src + '/*.twig',
    dest: dest,
    watchSrc: [
      src + '/*.twig',
      src + '/**/*.twig',
      src + '/json/*.json'
    ],
    data: '../.' + src + '/json/',
    includes: src + '/includes',
    variables: src + '/styles/variables.scss'
  }
}
