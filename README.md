# jquery.tableSortable

Makes a table sortable by clicking header cells.

Supports tables with `colSpan` & `rowSpan`.

## Usage

Import it after jQuery:

```html
<script src="https://unpkg.com/jquery-tablesortable"></script>
```

```js
$('table#myTable').tableSortable();

// custom comparison function
$('table#myTable').tableSortable({ cmp: (a,b) => a < b ? -1 : 1 });
```

Sample HTML:

```html
<table id="myTable">
    <thead>
        <tr>
            <th rowspan="2" class="nosort">Nr.</th>
            <th rowspan="2">Name</th>
            <th colspan="2">Order</th>
        </tr>
        <tr>
            <th>number</th>
            <th>text</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.</td>
            <td>Nikola</td>
            <td>2</td>
            <td>Tesla</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>John</td>
            <td>0</td>
            <td>Miller</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Jacque</td>
            <td>1</td>
            <td>Fresco</td>
        </tr>
    </tbody>
</table>
```

[Demo](https://duzun.github.io/jquery.tableSortable)
