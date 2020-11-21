/**
 * A simple jQuery plugin to sort table body by a selected column
 *
 * @license MIT
 * @author Dumitru Uzun (DUzun.Me)
 * @version 0.0.2
 */
export default function initTableSortable($) {
    const CLICK_TH_SELECTOR = 'th:not(.nosort),td.sort';
    let sort_dir;
    let cmp;
    const defaults = {
        cmp: undefined,
    };
    const tableSortable = function tableSortable(options) {
        options = $.extend({}, defaults, options);
        // Mark the table as initialized
        this.addClass('table_sortable');
        let $thead = this.children('thead');
        let $tbody = this.children('tbody');
        let $thr = $thead.children('tr');
        $thead.on('click', CLICK_TH_SELECTOR, function () {
            const $th = $(this);
            let sortOrder = $th.hasClass('asc') ? -1 : 1;
            const $ths = $thr.children(CLICK_TH_SELECTOR);
            $ths.removeClass('asc desc');
            if (sortOrder === -1) {
                $th.removeClass('asc').addClass('desc');
            }
            else {
                $th.removeClass('desc').addClass('asc');
            }
            let cols = $th.data('_cols_');
            if (cols == undefined) {
                calcCols($thr);
                cols = $th.data('_cols_');
            }
            const rows = $tbody.find('>tr:has(td)')
                .get() // get an Array
                .map((tr) => {
                const $tds = $(tr).children('td');
                const ret = cols.map(function (col) {
                    let val = $tds.eq(col).text().toUpperCase(); // ignore case
                    let ret = [val];
                    let num = parseFloat(val.trim());
                    if (!isNaN(num))
                        ret[1] = num;
                    return ret;
                });
                ret.tr = tr;
                return ret;
            });
            sort_dir = sortOrder > 0 ? 1 : -1;
            cmp = options.cmp;
            rows.sort(cmpArr);
            $tbody.append(rows.map((row) => row.tr));
        });
        return this;
    };
    // Comparison function for [].sort(), almost like narutal sort
    function cmpArr(_a, _b) {
        let ret;
        _a.some((a, idx) => {
            let b = _b[idx];
            if (cmp)
                return ret = cmp(a[0], b[0]);
            if (1 in a && 1 in b && (ret = a[1] - b[1])) {
                return ret;
            }
            else {
                let val1 = a[0];
                let val2 = b[0];
                if (val1 != val2) {
                    return ret = val1 < val2 ? -1 : 1;
                }
            }
        });
        return ret * sort_dir;
    }
    // Calc _cols_ indexes, respecting colspan and rowspan in headers
    function calcCols($thr) {
        let headerMatrix = [];
        $thr.each((rowIdx, tr) => {
            $(tr)
                .children('th,td')
                .each((colIdx, td) => {
                //@ts-ignore
                let { rowSpan, colSpan } = td;
                const cols = [];
                const colsDict = {};
                while (rowSpan-- > 0) {
                    let _rowIdx = rowIdx + rowSpan;
                    let _colSpan = colSpan;
                    while (_colSpan-- > 0) {
                        let _colIdx = colIdx + _colSpan;
                        let rowMatrix = headerMatrix[_rowIdx] || (headerMatrix[_rowIdx] = []);
                        while (rowMatrix[_colIdx])
                            ++_colIdx;
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
}
// Auto-init in browser when jQuery or Zepto is present
if (typeof window !== 'undefined') {
    const $ = window.jQuery || window.Zepto;
    if ($) {
        initTableSortable($);
    }
}
