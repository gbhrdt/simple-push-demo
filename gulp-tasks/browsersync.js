/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const gulp = require('gulp');

const ports = [8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088, 8089];

const browserSync = Object.assign(...ports.map(port => ({ [port]: require('browser-sync').create() })));

// Stash this in case other tasks want to use it
global.config.browserSyncReload = () => ports.forEach((port) => browserSync[port].reload());

gulp.task('browsersync', () => {
  ports.forEach((port) => {
    browserSync[port].init({
      server: {
        baseDir: global.config.dest,
      },
      ui: {
        port: port - 5079
      },
      port,
      open: false,
    });
  });
});
