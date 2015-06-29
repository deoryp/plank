var src = './';

module.exports = {
  browserSync: {
    server: {
      baseDir: [src]
    },
    files: [
      './**'
    ],
    port:8888,
    startPath: '/static/index.html',
    reloadDelay: 0
  }
};
