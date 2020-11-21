(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jqueryTableSortable = factory());
}(this, (function () { 'use strict';

    /**
     * A simple jQuery plugin to sort table body by a selected column
     *
     * @license MIT
     * @author Dumitru Uzun (DUzun.Me)
     * @version 0.0.2
     */
    function initTableSortable($) {
      var CLICK_TH_SELECTOR = 'th:not(.nosort),td.sort';
      var sort_dir;
      var cmp;
      var defaults = {
        cmp: undefined
      };

      var tableSortable = function tableSortable(options) {
        options = $.extend({}, defaults, options); // Mark the table as initialized

        this.addClass('table_sortable');
        var $thead = this.children('thead');
        var $tbody = this.children('tbody');
        var $thr = $thead.children('tr');
        $thead.on('click', CLICK_TH_SELECTOR, function () {
          var $th = $(this);
          var sortOrder = $th.hasClass('asc') ? -1 : 1;
          var $ths = $thr.children(CLICK_TH_SELECTOR);
          $ths.removeClass('asc desc');

          if (sortOrder === -1) {
            $th.removeClass('asc').addClass('desc');
          } else {
            $th.removeClass('desc').addClass('asc');
          }

          var cols = $th.data('_cols_');

          if (cols == undefined) {
            calcCols($thr);
            cols = $th.data('_cols_');
          }

          var rows = $tbody.find('>tr:has(td)').get() // get an Array
          .map(function (tr) {
            var $tds = $(tr).children('td');
            var ret = cols.map(function (col) {
              var val = $tds.eq(col).text().toUpperCase(); // ignore case

              var ret = [val];
              var num = parseFloat(val.trim());
              if (!isNaN(num)) ret[1] = num;
              return ret;
            });
            ret.tr = tr;
            return ret;
          });
          sort_dir = sortOrder > 0 ? 1 : -1;
          cmp = options.cmp;
          rows.sort(cmpArr);
          $tbody.append(rows.map(function (row) {
            return row.tr;
          }));
        });
        return this;
      }; // Comparison function for [].sort(), almost like narutal sort


      function cmpArr(_a, _b) {
        var ret;

        _a.some(function (a, idx) {
          var b = _b[idx];
          if (cmp) return ret = cmp(a[0], b[0]);

          if (1 in a && 1 in b && (ret = a[1] - b[1])) {
            return ret;
          } else {
            var val1 = a[0];
            var val2 = b[0];

            if (val1 != val2) {
              return ret = val1 < val2 ? -1 : 1;
            }
          }
        });

        return ret * sort_dir;
      } // Calc _cols_ indexes, respecting colspan and rowspan in headers


      function calcCols($thr) {
        var headerMatrix = [];
        $thr.each(function (rowIdx, tr) {
          $(tr).children('th,td').each(function (colIdx, td) {
            //@ts-ignore
            var rowSpan = td.rowSpan,
                colSpan = td.colSpan;
            var cols = [];
            var colsDict = {};

            while (rowSpan-- > 0) {
              var _rowIdx = rowIdx + rowSpan;

              var _colSpan = colSpan;

              while (_colSpan-- > 0) {
                var _colIdx = colIdx + _colSpan;

                var rowMatrix = headerMatrix[_rowIdx] || (headerMatrix[_rowIdx] = []);

                while (rowMatrix[_colIdx]) {
                  ++_colIdx;
                }

                rowMatrix[_colIdx] = td;

                if (!(_colIdx in colsDict)) {
                  cols.push(_colIdx);
                  colsDict[_colIdx] = _colIdx;
                }
              }
            }

            cols.sort();
            $(td).data('_cols_', cols);
          });
        });
      }

      tableSortable.defaults = defaults;
      $.fn.tableSortable = tableSortable;
      return tableSortable;
    } // Auto-init in browser when jQuery or Zepto is present

    if (typeof window !== 'undefined') {
      var $ = window.jQuery || window.Zepto;

      if ($) {
        initTableSortable($);
      }
    }

    return initTableSortable;

})));
//# sourceMappingURL=tableSortable.js.map
