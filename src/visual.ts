"use strict";
import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { VisualSettings } from "./settings";

import powerbi from "powerbi-visuals-api";
import IViewport = powerbi.IViewport;
import DataView = powerbi.DataView;
import DataViewTable = powerbi.DataViewTable;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTableRow = powerbi.DataViewTableRow;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;


// Import React dependencies and the added component
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Cardo,State, Values,initialeValues} from "./card";

import "./../style/visual.less";

export class Visual implements IVisual {
    private settings: VisualSettings;
    private viewport: IViewport;
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;

    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(Cardo, {});
        this.target = options.element;
        
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        if(options.dataViews && options.dataViews[0] && options.viewport ){
            const dataView: DataView = options.dataViews[0];
            const table: DataViewTable = dataView.table;
            const columns: DataViewMetadataColumn[] = table.columns;
            const rows: DataViewTableRow[] = table.rows;

            let vals = new Array<State>();
            for (var i : number = 0; i<columns.length;i++){
                vals.push({textLabel:columns[i].displayName,textValue:rows[0][i].toString()})
            }
            this.viewport = options.viewport;
            const { width, height } = this.viewport;
            this.settings = VisualSettings.parse(dataView) as VisualSettings;
            const object = this.settings.textsize;
            const color = this.settings.textcolor;
            const mainMeasureStyle = this.settings.mainMeasure;
            const secondaryMeasureStyle = this.settings.secondaryMeasure;
            const deltaStyle = this.settings.delta;

            const values: Values = {
                values: vals,
                width: width,
                height:height,
                mainMeasureLabelStyle:{color:mainMeasureStyle.labelColor,fontSize:mainMeasureStyle.labelSize},
                mainMeasureValueStyle:{fontSize:mainMeasureStyle.valueSize, color:mainMeasureStyle.valueColor, displayunits:mainMeasureStyle.displayunits},
                secondaryMeasurelabelStyle:{fontSize:secondaryMeasureStyle.labelSize, color: secondaryMeasureStyle.labelColor},
                secondaryMeasureValueStyle:{fontSize:secondaryMeasureStyle.valueSize, color: secondaryMeasureStyle.valueColor, displayunits: secondaryMeasureStyle.displayunits},
                deltaStyle:{fontSize:deltaStyle.valueSize, positiveColor: deltaStyle.positiveColor, negativeColor: deltaStyle.negativeColor},
                textColor: color && color.textColor ? color.textColor : undefined,
                valueFontSize: object && object.valueSize ? object.valueSize : undefined,
                labelFontSize: object && object.labelSize ? object.labelSize : undefined
            }

            Cardo.update(values);
        }
        else {
            this.clear();
        }
    
    }

    private clear() {
        Cardo.update(initialeValues);
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }

}