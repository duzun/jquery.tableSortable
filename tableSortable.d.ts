
type CmpFunction = (a: string, b: string) => number;
type TableSortableOptions = {
    cmp?: CmpFunction
};

/**
 * $.fn.tableSortable()
 */
interface TableSortablePlugin {
    (options?: Object): JQuery;
    defaults: TableSortableOptions;
}

/**
 * Extend the jQuery result declaration with the tableSortable plugin.
 */
interface JQuery {
    /**
     * Extension of the example plugin.
     */
    tableSortable: TableSortablePlugin;
}

/**
 * For auto-init
 */
interface Window {
    jQuery: JQueryStatic;
    Zepto: JQueryStatic;
}
