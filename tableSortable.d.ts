/**
 * $.fn.tableSortable()
 */
interface TableSortablePlugin {
    (): JQuery;
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
