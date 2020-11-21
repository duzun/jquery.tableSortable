# jquery.tableSortable

Makes a table sortable by clicking header cells.

Supports tables with `colSpan` & `rowSpan`.

## Usage

```js
    $('table#myTable').tableSortable();
```

Sample HTML:

```html
<table id="myTable">
    <thead>
        <tr>
            <th class="nosort">Nr.</th>
            <th>Name</th>
            <th>Order</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.</td>
            <td>Nikola</td>
            <td>2</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>John</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Jack</td>
            <td>1</td>
        </tr>
    </tbody>
</table>
```
