import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from "@mui/material";

export interface State {
    textLabel: string,
    textValue: string
}

export const initialeState: State = {
    textLabel: '',
    textValue: ''
}

export interface Style {
    fontSize:number,
    color?: string,
    displayunits?: string,
    positiveColor?: string,
    negativeColor?: string,
}


export interface Values {
    values: State[],
    width: number,
    height: number,
    mainMeasureValueStyle?: Style,
    secondaryMeasureValueStyle?: Style,
    mainMeasureLabelStyle?: Style,
    secondaryMeasurelabelStyle?: Style,
    deltaStyle?: Style,
    textColor: string,
    valueFontSize: number,
    labelFontSize: number
}

export const initialeValues: Values = {
    values: [],
    width:200,
    height: 200,
    mainMeasureLabelStyle:{
        fontSize:25,
        color:'black',
    },
    mainMeasureValueStyle:{
        fontSize:30,
        color:'black',
        displayunits:'none'
    },
    secondaryMeasurelabelStyle:{
        fontSize:20,
        color:'black'
    },
    secondaryMeasureValueStyle:{
        fontSize:25,
        color:'black',
        displayunits:'none'
    },
    deltaStyle: {
        fontSize: 20,
        positiveColor:"green",
        negativeColor:"red"
    },
    textColor: "white",
    valueFontSize: 1,
    labelFontSize: 0.7
}

export class Cardo extends React.Component<{}, Values>{
        constructor(props: any){
            super(props);
            this.state = initialeValues;
        }
    private static updateCallback: (data: object) => void = null

    public static update(newState: Values) {
        // this.setState(newState);
         if(typeof Cardo.updateCallback === 'function'){
             Cardo.updateCallback(newState); 
             }      
     }

     public changeState(newState){
        this.setState(newState)
    }

    
public componentDidMount() {
    Cardo.updateCallback = (newState: Values): void => {this.setState(newState);};
}


public componentWillUnmount() {
Cardo.updateCallback = null;
}



    render(){
        const { values, mainMeasureLabelStyle,mainMeasureValueStyle,secondaryMeasureValueStyle,secondaryMeasurelabelStyle, deltaStyle } = this.state;
        const mainMeasure:number = values[0] ?  Number.parseFloat(values[0].textValue) : 0;
        const secondaryMeasure:number =  values[1] ? Number.parseFloat(values[1].textValue) : 0;
        const delta = mainMeasure !== 0 ? (mainMeasure - secondaryMeasure)/mainMeasure : 0;
        const color:string = delta < 0 ? deltaStyle.negativeColor: deltaStyle.positiveColor;

        const mainMeasurevalue = mainMeasureValueStyle.displayunits === 'none' ? new Intl.NumberFormat('fr-FR').format(mainMeasure) : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(mainMeasure);
        const secondaryMeasurevalue = secondaryMeasureValueStyle.displayunits === 'none' ? new Intl.NumberFormat('fr-FR').format(secondaryMeasure) : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(secondaryMeasure);
        

        return (
   
    <Box sx={{ width:'100%', height:'100vh' }}>
        <Box sx={{height:'70%'}}>
      <Grid container spacing={1} sx={{justifyContent:"center", alignItems:"center"}}>
          <Grid item xs={12} ><Typography color="text.primary" sx={{fontSize:`${mainMeasureLabelStyle.fontSize}px` }}>{values[0] ? values[0].textLabel : "main measure"}</Typography></Grid>
            <Grid item xs={8} sx={{justifyContent:"center", alignItems:"center"}}>
                <Typography sx={{fontSize:`${mainMeasureValueStyle.fontSize}px`}} component="div" >{mainMeasurevalue}</Typography>
            </Grid>
            <Grid item xs={4} sx={{justifyContent:"center", alignItems:"center"}}>
                <Typography sx={{fontSize:`${deltaStyle.fontSize}px`,mr:1, textAlign:'right'}} color={color} component="div"> {"  " + (delta*100).toFixed(2) + "%"} </Typography>
            </Grid>
        </Grid>
        </Box>
        <Divider />
        <Box>
        <Grid container sx={{height:'30%', mt:1}}>
            <Grid item xs={6} sx={{my:'auto'}}>
                <Typography sx={{fontSize: `${secondaryMeasurelabelStyle.fontSize}px`, wordBreak:'break-word', my:'auto'}}>{values[1] ? values[1].textLabel : "secondary measure" }</Typography>
            </Grid>
            <Grid item xs={6} sx={{my:'auto'}}>
                <Typography sx={{fontSize:`${secondaryMeasureValueStyle.fontSize}px`,mr:1, textAlign:'right'}}>{secondaryMeasurevalue}</Typography>
            </Grid>  
        </Grid>
        </Box>
    </Box>

            // <div className="Card" style={style} >
            //     <div className="mainMeasure">
            //             <p className="mainMeasureLabel" style={{fontSize: labelFontSize + "rem"}}>{values[0] ? values[0].textLabel : "main measure"}</p>
            //             <div className="values">
            //                 <p className="mainMeasureValue" style={MainMeasureValueStyle}>{mainMeasure.toFixed(2)}</p>
            //                 <span className="delta" style={{color:color, fontSize: (valueFontSize-(valueFontSize/2)) + "rem" }}>{"  " + (delta*100).toFixed(2) + "%"}</span>
            //             </div>
            //     </div>
            //     <div className="scdrow">
            //         <div className="secondaryMeasure">
            //             <p className="secondaryMeasureLabel" style={{fontSize : (labelFontSize < 1 ? labelFontSize: labelFontSize - 0.3)+"rem" }}>{values[1] ? values[1].textLabel : "secondary measure" } </p>
            //             <p className="secondaryMeasureValue" style={{fontSize: (valueFontSize < 1 ? valueFontSize: valueFontSize - 0.5)+"rem"}}>{secondaryMeasure.toFixed(2)}</p>
            //         </div>
            //     </div>

            // </div>
        )
    }
}

export default Cardo;