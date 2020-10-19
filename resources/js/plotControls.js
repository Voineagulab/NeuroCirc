//All UI callbacks, links to plot
class PlotControls {
    constructor(elementId, xAxisAlias="X Axis", yAxisAlias="Y Axis", coloringVariableAlias="Metadata Variable") {
        var self = this;

        self.elementId = elementId;
        self.xAxisAlias = xAxisAlias;
        self.yAxisAlias = yAxisAlias;
        self.coloringVariableAlias = coloringVariableAlias;

        document.getElementById(self.elementId).innerHTML = self._generateHTML();

        self.datasetId = "datasetselect" + self.elementId;
        self.xAxisId = "xAxis" + self.elementId;

        $('#datasetselect' + self.elementId).on('change', () => self.onDatasetChange());
        $('#xaxisselect' + self.elementId).on('change', () => self.onChange());
        $('#yaxisselect' + self.elementId).on('change', () => self.onChange());
        $('#scaleselect' + self.elementId).on('change', () => self.onChange());
        $('#coloringselect' + self.elementId).on('change', () => self.onChange());
        $('#zscore' + self.elementId).on('change', () => self.onChange());

        self.onDatasetChange = ()=>{throw "not implimented";};
        self.onChange = ()=>{throw "not implimented";};

    }

    setScaleDisabled(value) {
        $('#scaleselect' + this.elementId).attr('disabled', value);
    }

    setColoringDisabled(value) {
        $('#coloringselect' + this.elementId).attr('disabled', value);
    }

    setDatasets(obj) {
        this._setOptionsToggle('datasetselect' + this.elementId, obj);
        this.onDatasetChange();
    }

    setXAxis(names, defaultName) {
        this._setOptions('xaxisselect' + this.elementId, names, defaultName);
        this.onChange();
        
    }

    setYAxis(names, defaultName) {
        this._setOptions('yaxisselect' + this.elementId, names, defaultName);
        this.onChange();
    }

    setColorings(names, defaultName) {
        this._setOptions('coloringselect' + this.elementId, names, defaultName);
        this.onChange();
    }

    getSelectedDataset() {
        return $('#datasetselect' + this.elementId).find(":selected").text();
    }

    getSelectedYAxis() {
        return $('#yaxisselect' + this.elementId).find(":selected").text();
    }

    getSelectedXAxis() {
        return $('#xaxisselect' + this.elementId).find(":selected").text();
    }

    getSelectedScale() {
        return $('#scaleselect' + this.elementId).find(":selected").text();
    }

    getSelectedColoring() {
        return $('#coloringselect' + this.elementId).find(":selected").text();
    }

    getSelectedZScore() {
        return $('#zscore' + this.elementId).prop('checked');
    }

    _setOptions(id, names, defaultName=undefined) {
        $("#" + id).empty();
        let index = 0;
        if(defaultName) {
            let found = names.indexOf(defaultName);
            if(found == -1) names.unshift(defaultName);
            else index = found;
        }
        for (let n of names) $('#' + id).append('<option value="' + n + '">' + n + '</option>');
        $("#" + id).prop('selectedIndex', index);
    }

    _setOptionsToggle(id, obj) {
        $("#" + id).empty();
        for (let o of obj) $('#' + id).append('<option value="' + o.name + '"' + (o.disabled ? 'disabled' : '') + '>' + o.name + '</option>');
        $("#" + id + ' option:not([disabled]):first').addClass('highlight');
    }

    _generateHTML() {
        return /*html*/`
            <div>Select Dataset</div>
            <select id="datasetselect${this.elementId}" class="selectpicker">
            </select>
            <br><br>
            <div>Select ${this.yAxisAlias}</div>
            <select id="yaxisselect${this.elementId}" class="selectpicker">
            </select>
            <br><br>
            <input type="checkbox" id="zscore${this.elementId}" name="zscore" value="zscore">
            <label for="zscore${this.elementId}">ZScore Transformation</label>
            <br><br>
            <div>Select ${this.xAxisAlias}</div>
            <select id="xaxisselect${this.elementId}" class="selectpicker">
            </select>
            <br><br>
            <div>Select Scale</div>
            <select id="scaleselect${this.elementId}" class="selectpicker">
                <option>Linear</option>
                <option>Log e</option>
                <option>Log 10</option>
            </select>
            <br><br>
            <div>Select ${this.coloringVariableAlias}</div>
            <select id="coloringselect${this.elementId}" class="selectpicker">
            </select>
        `
    }
}