/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class mainMeasureSettings {
  public labelSize: number = 25;
  public labelColor: string = "black";
  public valueSize: number = 30;
  public valueColor : string = "black";
  public displayunits: string = "none";
}
export class secondaryMeasureSettings {
  public labelSize: number = 20;
  public labelColor: string = "black";
  public valueSize: number = 25;
  public valueColor : string = "black";
  public displayunits: string = "none";
}

export class deltaSettings {
  public valueSize: number = 20;
  public positiveColor : string = "green";
  public negativeColor : string = "red";
}


export class TextSettings {
    public labelSize: number = 0.7;
    public valueSize: number = 1;
}

export class ColorSettings{
  public textColor: string = "white";
}

export class VisualSettings extends DataViewObjectsParser { 
   public mainMeasure: mainMeasureSettings = new mainMeasureSettings();
    public secondaryMeasure: secondaryMeasureSettings = new secondaryMeasureSettings();
    public delta: deltaSettings = new deltaSettings();
    public textsize: TextSettings = new TextSettings();
    public textcolor: ColorSettings = new ColorSettings();
  
}
