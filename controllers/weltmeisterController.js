fs = require('fs')
path = require('path');
var root = './public/';
exports.glob = function(req, res) {
  var glob = require('glob');
  var globs = req.query.glob;
  var nocache = req.query.nocache;

  // Possibly need to check to see if globs is an array.
  var files = new Array();
  for(var i in globs){
    var pattern = root + globs[i];
    glob(pattern, {}, function(e, matches){
      for (var i in matches) {
        var match = matches[i].substring(root.length);
        files.push(match);
      }
      res.send(files);
    });
  }
}

exports.browse = function(req,res){
  var dir = req.query.dir || '';
  var type = req.query.type;
  var  types = { scripts: ['.js'], images: ['.png', '.gif', '.jpg', '.jpeg'] };
  var  result = { parent: false, dirs: [], files: [] };

  var filter = (type && types[type]) ? types[type] : false;
  result.parent = dir ? dir.substring(0, dir.lastIndexOf('/')) : false;

  if (dir[dir.length-1] === '/') dir = dir.substring(0, dir.length-1);
  dir += '/';

  var dirpath = path.normalize(root + dir);
  var stats;
  fs.readdir(dirpath, function(err, files){
    for (var i in files) {
      stats = fs.statSync(dirpath + files[i]);
      if (stats.isDirectory()) {
        result.dirs.push(dir + files[i]);
      } else if (stats.isFile()) {
        if (filter) {
          if (filter.indexOf(path.extname(files[i])) >= 0) {
            result.files.push(dir + files[i]);
          }
        } else {
          result.files.push(dir + files[i]);
        }
      }
    }
    res.send(result);
  });
}

exports.save = function(req,res){

  var path = req.body.path,
    data = req.body.data;
  console.log(req.body);

  console.log(path);
  if (path && data) {
    if (/\.js$/.test(path)) {
      fs.writeFile(root+path, data, function(err){
        if (err) {
          res.send({ error: 2, msg: 'Couldn\'t write to file: '+ path });
        } else {
          res.send({ error: 0 });
        }
      });
    } else {
      res.send({ error: 3, msg: 'File must have a .js suffix' });
    }
  } else {
    res.send({ error: 1, msg: 'No Data or Path specified' });
  }
}
    /*<?php
     require_once( 'config.php' );

     $globs = is_array($_GET['glob']) ? $_GET['glob'] : array($_GET['glob']);
     $files = array();
     foreach( $globs as $glob ) {
     $pattern = WM_Config::$fileRoot . str_replace( '..', '', $glob );
     $files = array_merge( $files, (array)glob( $pattern ) );
     }

     $fileRootLength = strlen( WM_Config::$fileRoot );
     foreach( $files as $i => $f ) {
     $files[$i] = substr( $f, $fileRootLength );
     }

     echo json_encode( $files );

     ?>*/