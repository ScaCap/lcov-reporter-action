var $70OUV$swchelperslib_async_to_generatorjs = require("@swc/helpers/lib/_async_to_generator.js");
var $70OUV$swchelperslib_ts_generatorjs = require("@swc/helpers/lib/_ts_generator.js");
var $70OUV$fs = require("fs");
var $70OUV$path = require("path");
var $70OUV$actionscore = require("@actions/core");
var $70OUV$actionsgithub = require("@actions/github");
var $70OUV$lcovparse = require("lcov-parse");
var $70OUV$swchelperslib_to_consumable_arrayjs = require("@swc/helpers/lib/_to_consumable_array.js");
var $70OUV$swchelperslib_object_spreadjs = require("@swc/helpers/lib/_object_spread.js");
var $70OUV$swchelperslib_object_spread_propsjs = require("@swc/helpers/lib/_object_spread_props.js");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}







var $4972ce6f03c7f1c7$export$98e6a39c04603d36 = function(data) {
    return new Promise(function(resolve, reject) {
        (0, ($parcel$interopDefault($70OUV$lcovparse)))(data, function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
};
var $4972ce6f03c7f1c7$export$a3560dfa62c7efe0 = function(lcovData) {
    var hit = 0;
    var found = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = lcovData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var entry = _step.value;
            hit += entry.lines.hit;
            found += entry.lines.found;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return hit / found * 100;
};


var $167d3d2ca4cb5316$var$tag = function(name) {
    return function() {
        for(var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++){
            children[_key] = arguments[_key];
        }
        var props = typeof children[0] === "object" ? Object.keys(children[0]).map(function(key) {
            return " ".concat(key, "='").concat(children[0][key], "'");
        }).join("") : "";
        var c = typeof children[0] === "string" ? children : children.slice(1);
        return "<".concat(name).concat(props, ">").concat(c.join(""), "</").concat(name, ">");
    };
};
var $167d3d2ca4cb5316$export$41ee12f6f6f05843 = $167d3d2ca4cb5316$var$tag("details");
var $167d3d2ca4cb5316$export$9a2dbef7a17e2e58 = $167d3d2ca4cb5316$var$tag("summary");
var $167d3d2ca4cb5316$export$72451b88a72ad9c2 = $167d3d2ca4cb5316$var$tag("tr");
var $167d3d2ca4cb5316$export$2beef8af2014e5c6 = $167d3d2ca4cb5316$var$tag("td");
var $167d3d2ca4cb5316$export$d657bc098992a431 = $167d3d2ca4cb5316$var$tag("th");
var $167d3d2ca4cb5316$export$8b22cf2602fb60ce = $167d3d2ca4cb5316$var$tag("b");
var $167d3d2ca4cb5316$export$9852986a3ec5f6a0 = $167d3d2ca4cb5316$var$tag("table");
var $167d3d2ca4cb5316$export$7cdd536eaa8f163c = $167d3d2ca4cb5316$var$tag("tbody");
var $167d3d2ca4cb5316$export$407448d2b89b1813 = $167d3d2ca4cb5316$var$tag("a");
var $167d3d2ca4cb5316$export$afc1bfabebaf28a2 = $167d3d2ca4cb5316$var$tag("span");
var $167d3d2ca4cb5316$export$f00aeb236b6f05af = function() {
    for(var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++){
        children[_key] = arguments[_key];
    }
    return children.join("");
};





var $0203d2d5b98943d8$var$filename = function(file, indent, options) {
    var relative = file.file.replace(options.prefix, "");
    var href = "https://github.com/".concat(options.repository, "/blob/").concat(options.commit, "/").concat(relative);
    var parts = relative.split("/");
    var last = parts[parts.length - 1];
    var space = indent ? "&nbsp; &nbsp;" : "";
    return (0, $167d3d2ca4cb5316$export$f00aeb236b6f05af)(space, (0, $167d3d2ca4cb5316$export$407448d2b89b1813)({
        href: href
    }, last));
};
var $0203d2d5b98943d8$var$percentage = function(item) {
    if (!item) return "N/A";
    var value = item.found === 0 ? 100 : item.hit / item.found * 100;
    var rounded = value.toFixed(2).replace(RegExp("\\.0*$", "u"), "");
    var tag = value === 100 ? (0, $167d3d2ca4cb5316$export$f00aeb236b6f05af) : (0, $167d3d2ca4cb5316$export$8b22cf2602fb60ce);
    return tag("".concat(rounded, "%"));
};
var $0203d2d5b98943d8$var$uncovered = function(file, options) {
    var branches = (file.branches ? file.branches.details : []).filter(function(branch) {
        return branch.taken === 0;
    }).map(function(branch) {
        return branch.line;
    });
    var lines = (file.lines ? file.lines.details : []).filter(function(line) {
        return line.hit === 0;
    }).map(function(line) {
        return line.line;
    });
    var all = (0, ($parcel$interopDefault($70OUV$swchelperslib_to_consumable_arrayjs)))(branches).concat((0, ($parcel$interopDefault($70OUV$swchelperslib_to_consumable_arrayjs)))(lines)).sort();
    return all.map(function(line) {
        var relative = file.file.replace(options.prefix, "");
        var href = "https://github.com/".concat(options.repository, "/blob/").concat(options.commit, "/").concat(relative, "#L").concat(line);
        return (0, $167d3d2ca4cb5316$export$407448d2b89b1813)({
            href: href
        }, line);
    }).join(", ");
};
var $0203d2d5b98943d8$var$toRow = function(file, indent, options) {
    return (0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)($0203d2d5b98943d8$var$filename(file, indent, options)), (0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)($0203d2d5b98943d8$var$percentage(file.branches, options)), (0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)($0203d2d5b98943d8$var$percentage(file.functions, options)), (0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)($0203d2d5b98943d8$var$percentage(file.lines, options)), (0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)($0203d2d5b98943d8$var$uncovered(file, options)));
};
var $0203d2d5b98943d8$var$toFolder = function(path) {
    if (path === "") return "";
    return (0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$2beef8af2014e5c6)({
        colspan: 5
    }, (0, $167d3d2ca4cb5316$export$8b22cf2602fb60ce)(path)));
};
var $0203d2d5b98943d8$export$ca9b9ec2a0bc981c = function(lcov, options) {
    var head = (0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$d657bc098992a431)("File"), (0, $167d3d2ca4cb5316$export$d657bc098992a431)("Branches"), (0, $167d3d2ca4cb5316$export$d657bc098992a431)("Funcs"), (0, $167d3d2ca4cb5316$export$d657bc098992a431)("Lines"), (0, $167d3d2ca4cb5316$export$d657bc098992a431)("Uncovered Lines"));
    var folders = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = lcov[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var file = _step.value;
            var parts = file.file.replace(options.prefix, "").split("/");
            var folder = parts.slice(0, -1).join("/");
            folders[folder] = folders[folder] || [];
            folders[folder].push(file);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var rows = Object.keys(folders).sort().reduce(function(acc, key) {
        return (0, ($parcel$interopDefault($70OUV$swchelperslib_to_consumable_arrayjs)))(acc).concat([
            $0203d2d5b98943d8$var$toFolder(key, options)
        ], (0, ($parcel$interopDefault($70OUV$swchelperslib_to_consumable_arrayjs)))(folders[key].map(function(file) {
            return $0203d2d5b98943d8$var$toRow(file, key !== "", options);
        })));
    }, []);
    return (0, $167d3d2ca4cb5316$export$9852986a3ec5f6a0)((0, $167d3d2ca4cb5316$export$7cdd536eaa8f163c).apply(void 0, [
        head
    ].concat((0, ($parcel$interopDefault($70OUV$swchelperslib_to_consumable_arrayjs)))(rows))));
};


/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {number} pdiff value from diff percentage
 * @returns {string} emoji string for negative/positive pdiff
 */ var $5a804a5eff6031ee$var$renderEmoji = function(pdiff) {
    if (pdiff.toFixed(2) < 0) return "❌";
    return "✅";
};
/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {Array} otherArray
 * @returns {Function} function with filtering non original lines
 */ var $5a804a5eff6031ee$var$comparer = function(otherArray) {
    return function(current) {
        return otherArray.filter(function(other) {
            return other.lines.found === current.lines.found && other.lines.hit === current.lines.hit;
        }).length === 0;
    };
};
/**
 * Github comment for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {{Array<{packageName, lcovBasePath}>}} lcovBaseArrayForMonorepo
 * @param {*} options
 */ var $5a804a5eff6031ee$var$commentForMonorepo = function(lcovArrayForMonorepo, lcovBaseArrayForMonorepo, options) {
    var base = options.base;
    var html = lcovArrayForMonorepo.map(function(lcovObj) {
        var baseLcov = lcovBaseArrayForMonorepo.find(function(el) {
            return el.packageName === lcovObj.packageName;
        });
        var pbefore = baseLcov ? (0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(baseLcov.lcov) : 0;
        var pafter = baseLcov ? (0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(lcovObj.lcov) : 0;
        var pdiff = pafter - pbefore;
        var plus = pdiff > 0 ? "+" : "";
        var arrow = "";
        if (pdiff < 0) arrow = "▾";
        else if (pdiff > 0) arrow = "▴";
        var pdiffHtml = baseLcov ? (0, $167d3d2ca4cb5316$export$d657bc098992a431)($5a804a5eff6031ee$var$renderEmoji(pdiff), " ", arrow, " ", plus, pdiff.toFixed(2), "%") : "";
        var report = lcovObj.lcov;
        if (baseLcov) {
            var onlyInLcov = lcovObj.lcov.filter($5a804a5eff6031ee$var$comparer(baseLcov));
            var onlyInBefore = baseLcov.filter($5a804a5eff6031ee$var$comparer(lcovObj.lcov));
            report = onlyInBefore.concat(onlyInLcov);
        }
        return "".concat((0, $167d3d2ca4cb5316$export$9852986a3ec5f6a0)((0, $167d3d2ca4cb5316$export$7cdd536eaa8f163c)((0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$d657bc098992a431)(lcovObj.packageName), (0, $167d3d2ca4cb5316$export$d657bc098992a431)((0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(lcovObj.lcov).toFixed(2), "%"), pdiffHtml))), " \n\n ").concat((0, $167d3d2ca4cb5316$export$41ee12f6f6f05843)((0, $167d3d2ca4cb5316$export$9a2dbef7a17e2e58)("Coverage Report"), (0, $0203d2d5b98943d8$export$ca9b9ec2a0bc981c)(report, options)), " <br/>");
    });
    var title = "Coverage after merging into ".concat((0, $167d3d2ca4cb5316$export$8b22cf2602fb60ce)(base), " <p></p>");
    return (0, $167d3d2ca4cb5316$export$f00aeb236b6f05af)(title, html.join(""));
};
/**
 * Github comment for single repo
 * @param {raw lcov} lcov
 * @param {*} options
 */ var $5a804a5eff6031ee$var$comment = function(lcov, before, options) {
    var appName = options.appName, base = options.base;
    var pbefore = before ? (0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(before) : 0;
    var pafter = before ? (0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(lcov) : 0;
    var pdiff = pafter - pbefore;
    var plus = pdiff > 0 ? "+" : "";
    var arrow = "";
    if (pdiff < 0) arrow = "▾";
    else if (pdiff > 0) arrow = "▴";
    var pdiffHtml = before ? (0, $167d3d2ca4cb5316$export$d657bc098992a431)($5a804a5eff6031ee$var$renderEmoji(pdiff), " ", arrow, " ", plus, pdiff.toFixed(2), "%") : "";
    var report = lcov;
    if (before) {
        var onlyInLcov = lcov.filter($5a804a5eff6031ee$var$comparer(before));
        var onlyInBefore = before.filter($5a804a5eff6031ee$var$comparer(lcov));
        report = onlyInBefore.concat(onlyInLcov);
    }
    var title = "Coverage after merging into ".concat((0, $167d3d2ca4cb5316$export$8b22cf2602fb60ce)(base), " <p></p>");
    var header = appName ? (0, $167d3d2ca4cb5316$export$7cdd536eaa8f163c)((0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$d657bc098992a431)(appName), (0, $167d3d2ca4cb5316$export$d657bc098992a431)((0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(lcov).toFixed(2), "%"), pdiffHtml)) : (0, $167d3d2ca4cb5316$export$7cdd536eaa8f163c)((0, $167d3d2ca4cb5316$export$72451b88a72ad9c2)((0, $167d3d2ca4cb5316$export$d657bc098992a431)((0, $4972ce6f03c7f1c7$export$a3560dfa62c7efe0)(lcov).toFixed(2), "%"), pdiffHtml));
    return (0, $167d3d2ca4cb5316$export$f00aeb236b6f05af)(title, (0, $167d3d2ca4cb5316$export$9852986a3ec5f6a0)(header), "\n\n", (0, $167d3d2ca4cb5316$export$41ee12f6f6f05843)((0, $167d3d2ca4cb5316$export$9a2dbef7a17e2e58)("Coverage Report"), (0, $0203d2d5b98943d8$export$ca9b9ec2a0bc981c)(report, options)));
};
var $5a804a5eff6031ee$export$a37e3c603d7117e5 = function(lcov, before, options) {
    return $5a804a5eff6031ee$var$comment(lcov, before, options);
};
var $5a804a5eff6031ee$export$bca70a385d0ec2e1 = function(lcovArrayForMonorepo, lcovBaseArrayForMonorepo, options) {
    return $5a804a5eff6031ee$var$commentForMonorepo(lcovArrayForMonorepo, lcovBaseArrayForMonorepo, options);
};


// Modified from: https://github.com/slavcodev/coverage-monitor-action
// Not needed for now, but could be useful
// const createStatus = async ({ client, context, sha, status }) =>
// 	client.repos.createCommitStatus({
// 		...context.repo,
// 		sha,
// 		...status,
// 	})
// Every comment written by our action will have this hidden
// header on top, and will be used to identify which comments
// to update/delete etc




var $9a8d93f20edd9179$var$appendHiddenHeaderToComment = function(body, hiddenHeader) {
    return hiddenHeader + body;
};
var $9a8d93f20edd9179$var$listComments = function() {
    var _ref = (0, ($parcel$interopDefault($70OUV$swchelperslib_async_to_generatorjs)))(function(param) {
        var client, context, prNumber, hiddenHeader, _client_issues, _ref, _ref1, existingComments;
        return (0, ($parcel$interopDefault($70OUV$swchelperslib_ts_generatorjs)))(this, function(_state) {
            switch(_state.label){
                case 0:
                    client = param.client, context = param.context, prNumber = param.prNumber, hiddenHeader = param.hiddenHeader;
                    return [
                        4,
                        (_client_issues = client.issues) === null || _client_issues === void 0 ? void 0 : _client_issues.listComments((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spreadjs)))({}, context.repo), {
                            issue_number: prNumber
                        }))
                    ];
                case 1:
                    _ref1 = (_ref = _state.sent()) !== null && _ref !== void 0 ? _ref : {}, existingComments = _ref1.data;
                    return [
                        2,
                        existingComments.filter(function(param) {
                            var body = param.body;
                            return body.startsWith(hiddenHeader);
                        })
                    ];
            }
        });
    });
    return function listComments(_) {
        return _ref.apply(this, arguments);
    };
}();
var $9a8d93f20edd9179$var$insertComment = function(param, hiddenHeader) {
    var client = param.client, context = param.context, prNumber = param.prNumber, body = param.body;
    return client.issues.createComment((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spreadjs)))({}, context.repo), {
        issue_number: prNumber,
        body: $9a8d93f20edd9179$var$appendHiddenHeaderToComment(body, hiddenHeader)
    }));
};
var $9a8d93f20edd9179$var$updateComment = function(param, hiddenHeader) {
    var client = param.client, context = param.context, body = param.body, commentId = param.commentId;
    return client.issues.updateComment((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spreadjs)))({}, context.repo), {
        comment_id: commentId,
        body: $9a8d93f20edd9179$var$appendHiddenHeaderToComment(body, hiddenHeader)
    }));
};
var $9a8d93f20edd9179$var$deleteComments = function(param) {
    var client = param.client, context = param.context, comments = param.comments;
    return Promise.all(comments.map(function(param) {
        var id = param.id;
        return client.issues.deleteComment((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spread_propsjs)))((0, ($parcel$interopDefault($70OUV$swchelperslib_object_spreadjs)))({}, context.repo), {
            comment_id: id
        }));
    }));
};
var $9a8d93f20edd9179$export$59a2bc1b328cadf5 = function() {
    var _ref = (0, ($parcel$interopDefault($70OUV$swchelperslib_async_to_generatorjs)))(function(param) {
        var client, context, prNumber, body, hiddenHeader, existingComments, last;
        return (0, ($parcel$interopDefault($70OUV$swchelperslib_ts_generatorjs)))(this, function(_state) {
            switch(_state.label){
                case 0:
                    client = param.client, context = param.context, prNumber = param.prNumber, body = param.body, hiddenHeader = param.hiddenHeader;
                    return [
                        4,
                        $9a8d93f20edd9179$var$listComments({
                            client: client,
                            context: context,
                            prNumber: prNumber,
                            hiddenHeader: hiddenHeader
                        })
                    ];
                case 1:
                    existingComments = _state.sent();
                    last = existingComments.pop();
                    return [
                        4,
                        $9a8d93f20edd9179$var$deleteComments({
                            client: client,
                            context: context,
                            comments: existingComments
                        })
                    ];
                case 2:
                    _state.sent();
                    return [
                        2,
                        last ? $9a8d93f20edd9179$var$updateComment({
                            client: client,
                            context: context,
                            body: body,
                            commentId: last.id
                        }, hiddenHeader) : $9a8d93f20edd9179$var$insertComment({
                            client: client,
                            context: context,
                            prNumber: prNumber,
                            body: body
                        }, hiddenHeader)
                    ];
            }
        });
    });
    return function upsertComment(_) {
        return _ref.apply(this, arguments);
    };
}();


/**
 * Find all files inside a dir, recursively.
 * @function getLcovFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */ var $1672ee25661f8d95$var$getLcovFiles = function(dir, filelist) {
    var fileArray = filelist || [];
    (0, ($parcel$interopDefault($70OUV$fs))).readdirSync(dir).forEach(function(file) {
        fileArray = (0, ($parcel$interopDefault($70OUV$fs))).statSync((0, ($parcel$interopDefault($70OUV$path))).join(dir, file)).isDirectory() ? $1672ee25661f8d95$var$getLcovFiles((0, ($parcel$interopDefault($70OUV$path))).join(dir, file), fileArray) : fileArray.filter(function(f) {
            return f.path.includes("lcov.info");
        }).concat({
            name: dir.split("/")[1],
            path: (0, ($parcel$interopDefault($70OUV$path))).join(dir, file)
        });
    });
    return fileArray;
};
/**
 * Find all files inside a dir, recursively for base branch.
 * @function getLcovBaseFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */ var $1672ee25661f8d95$var$getLcovBaseFiles = function(dir, filelist) {
    var fileArray = filelist || [];
    (0, ($parcel$interopDefault($70OUV$fs))).readdirSync(dir).forEach(function(file) {
        fileArray = (0, ($parcel$interopDefault($70OUV$fs))).statSync((0, ($parcel$interopDefault($70OUV$path))).join(dir, file)).isDirectory() ? $1672ee25661f8d95$var$getLcovBaseFiles((0, ($parcel$interopDefault($70OUV$path))).join(dir, file), fileArray) : fileArray.filter(function(f) {
            return f.path.includes("lcov-base.info");
        }).concat({
            name: dir.split("/")[1],
            path: (0, ($parcel$interopDefault($70OUV$path))).join(dir, file)
        });
    });
    return fileArray;
};
var $1672ee25661f8d95$var$main = function() {
    var _ref = (0, ($parcel$interopDefault($70OUV$swchelperslib_async_to_generatorjs)))(function() {
        var _ref, _ref_context, context, token, lcovFile, baseFile, appName, monorepoBasePath, raw, _tmp, baseRaw, _tmp1, lcovArray, lcovBaseArray, lcovArrayForMonorepo, lcovBaseArrayForMonorepo, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, rLcove, data, err, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, file1, rLcovBase, data1, err, options, lcov, _tmp2, baselcov, _tmp3, client;
        return (0, ($parcel$interopDefault($70OUV$swchelperslib_ts_generatorjs)))(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ref = (0, ($parcel$interopDefault($70OUV$actionsgithub))) || {}, _ref_context = _ref.context, context = _ref_context === void 0 ? {} : _ref_context;
                    token = (0, ($parcel$interopDefault($70OUV$actionscore))).getInput("github-token");
                    lcovFile = (0, ($parcel$interopDefault($70OUV$actionscore))).getInput("lcov-file") || "./coverage/lcov.info";
                    baseFile = (0, ($parcel$interopDefault($70OUV$actionscore))).getInput("lcov-base");
                    appName = (0, ($parcel$interopDefault($70OUV$actionscore))).getInput("app-name");
                    monorepoBasePath = (0, ($parcel$interopDefault($70OUV$actionscore))).getInput("monorepo-base-path");
                    _tmp = !monorepoBasePath;
                    if (!_tmp) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        (0, $70OUV$fs.promises).readFile(lcovFile, "utf-8").catch(function(err) {
                            return console.error(err);
                        })
                    ];
                case 1:
                    _tmp = _state.sent();
                    _state.label = 2;
                case 2:
                    raw = _tmp;
                    if (!monorepoBasePath && !raw) {
                        console.log("No coverage report found at '".concat(lcovFile, "', exiting..."));
                        return [
                            2
                        ];
                    }
                    _tmp1 = baseFile;
                    if (!_tmp1) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        (0, $70OUV$fs.promises).readFile(baseFile, "utf-8").catch(function(err) {
                            return console.error(err);
                        })
                    ];
                case 3:
                    _tmp1 = _state.sent();
                    _state.label = 4;
                case 4:
                    baseRaw = _tmp1;
                    if (!monorepoBasePath && baseFile && !baseRaw) console.log("No coverage report found at '".concat(baseFile, "', ignoring..."));
                    lcovArray = monorepoBasePath ? $1672ee25661f8d95$var$getLcovFiles(monorepoBasePath) : [];
                    lcovBaseArray = monorepoBasePath ? $1672ee25661f8d95$var$getLcovBaseFiles(monorepoBasePath) : [];
                    lcovArrayForMonorepo = [];
                    lcovBaseArrayForMonorepo = [];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 5;
                case 5:
                    _state.trys.push([
                        5,
                        11,
                        12,
                        13
                    ]);
                    _iterator = lcovArray[Symbol.iterator]();
                    _state.label = 6;
                case 6:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        10
                    ];
                    file = _step.value;
                    if (!file.path.includes(".info")) return [
                        3,
                        9
                    ];
                    return [
                        4,
                        (0, $70OUV$fs.promises).readFile(file.path, "utf8")
                    ];
                case 7:
                    rLcove = _state.sent();
                    return [
                        4,
                        (0, $4972ce6f03c7f1c7$export$98e6a39c04603d36)(rLcove)
                    ];
                case 8:
                    data = _state.sent();
                    lcovArrayForMonorepo.push({
                        packageName: file.name,
                        lcov: data
                    });
                    _state.label = 9;
                case 9:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        6
                    ];
                case 10:
                    return [
                        3,
                        13
                    ];
                case 11:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        13
                    ];
                case 12:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 13:
                    _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    _state.label = 14;
                case 14:
                    _state.trys.push([
                        14,
                        20,
                        21,
                        22
                    ]);
                    _iterator1 = lcovBaseArray[Symbol.iterator]();
                    _state.label = 15;
                case 15:
                    if (!!(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done)) return [
                        3,
                        19
                    ];
                    file1 = _step1.value;
                    if (!file1.path.includes(".info")) return [
                        3,
                        18
                    ];
                    return [
                        4,
                        (0, $70OUV$fs.promises).readFile(file1.path, "utf8")
                    ];
                case 16:
                    rLcovBase = _state.sent();
                    return [
                        4,
                        (0, $4972ce6f03c7f1c7$export$98e6a39c04603d36)(rLcovBase)
                    ];
                case 17:
                    data1 = _state.sent();
                    lcovBaseArrayForMonorepo.push({
                        packageName: file1.name,
                        lcov: data1
                    });
                    _state.label = 18;
                case 18:
                    _iteratorNormalCompletion1 = true;
                    return [
                        3,
                        15
                    ];
                case 19:
                    return [
                        3,
                        22
                    ];
                case 20:
                    err = _state.sent();
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                    return [
                        3,
                        22
                    ];
                case 21:
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                    return [
                        7
                    ];
                case 22:
                    options = {
                        repository: context.payload.repository.full_name,
                        commit: context.payload.pull_request.head.sha,
                        prefix: "".concat(undefined, "/"),
                        head: context.payload.pull_request.head.ref,
                        base: context.payload.pull_request.base.ref,
                        appName: appName
                    };
                    _tmp2 = !monorepoBasePath;
                    if (!_tmp2) return [
                        3,
                        24
                    ];
                    return [
                        4,
                        (0, $4972ce6f03c7f1c7$export$98e6a39c04603d36)(raw)
                    ];
                case 23:
                    _tmp2 = _state.sent();
                    _state.label = 24;
                case 24:
                    lcov = _tmp2;
                    _tmp3 = baseRaw;
                    if (!_tmp3) return [
                        3,
                        26
                    ];
                    return [
                        4,
                        (0, $4972ce6f03c7f1c7$export$98e6a39c04603d36)(baseRaw)
                    ];
                case 25:
                    _tmp3 = _state.sent();
                    _state.label = 26;
                case 26:
                    baselcov = _tmp3;
                    client = (0, ($parcel$interopDefault($70OUV$actionsgithub))).getOctokit(token);
                    return [
                        4,
                        (0, $9a8d93f20edd9179$export$59a2bc1b328cadf5)({
                            client: client,
                            context: context,
                            prNumber: context.payload.pull_request.number,
                            body: !lcovArrayForMonorepo.length ? (0, $5a804a5eff6031ee$export$a37e3c603d7117e5)(lcov, baselcov, options) : (0, $5a804a5eff6031ee$export$bca70a385d0ec2e1)(lcovArrayForMonorepo, lcovBaseArrayForMonorepo, options),
                            hiddenHeader: appName ? "<!-- ".concat(appName, "-code-coverage-assistant -->") : "<!-- monorepo-code-coverage-assistant -->"
                        })
                    ];
                case 27:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function main() {
        return _ref.apply(this, arguments);
    };
}();
$1672ee25661f8d95$var$main().catch(function(err) {
    console.log(err);
    (0, ($parcel$interopDefault($70OUV$actionscore))).setFailed(err.message);
});


//# sourceMappingURL=main.js.map
