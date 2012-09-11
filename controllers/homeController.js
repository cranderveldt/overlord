

exports.default = function(req, res) {
  res.render('default',
    {"title" : "My Game",
      "header" : "The story of ShoeJitsu",
      "description" : "The Art of Shopping / Narrowing many to one / This is ShoeJitsu.",
      "keywords": "ShoeJitsu, art of shopping, shoe game, shoe poem, shoe haiku"
    }
  );
};

exports.editor = function(req, res) {
  res.render('editor',
    {"title" : "My Game",
      "header" : "The story of ShoeJitsu"
    }
  );
};