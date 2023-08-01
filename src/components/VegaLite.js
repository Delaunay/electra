import {useEffect, useState} from 'react'

// import * as vega from "vega-lite";
import embed from 'vega-embed';
import { Table } from './Table'


const BarSpec = (x, y, values) => {
    return {
        '$schema': 'https://vega.github.io/schema/vega-lite/v5.json',
        'description': 'A simple bar chart with embedded data.',
        'data': {
          'values': values
        },
        'mark': 'bar',
        'encoding': {
          'x': {'field': x, 'type': 'ordinal'},
          'y': {'field': y, 'type': 'quantitative'}
        }
      }
}

const VegaLite = (props) => {
    const { isLoading, args } = props;
    const [size, SetSize]= useState([1, 500])
    const [GotSize, SetGotSize]= useState(false)

    let data = [
        {'a': 'A', 'b': 28},
        {'a': 'B', 'b': 55},
        {'a': 'C', 'b': 43},
        {'a': 'D', 'b': 91},
        {'a': 'E', 'b': 81},
        {'a': 'F', 'b': 53},
        {'a': 'G', 'b': 19},
        {'a': 'H', 'b': 87}, 
        {'a': 'I', 'b': 52}
    ] 
 
    let spec = BarSpec('a', 'b', data);
    spec['width'] = size[0]
    spec['height'] = size[1]  

    useEffect(() => {
        // without the guard it keeps growing
        if (!GotSize) {
            var elem = document.getElementById('view'); 
            var positionInfo = elem.getBoundingClientRect();
            var height = positionInfo.height;  
            var width = positionInfo.width;
   
            SetSize([Math.max(width, size[0]), Math.max(height, size[1])])  
            SetGotSize(true)
            console.log(positionInfo)  
        }
        }, 
        []
    )
  
    embed('#view', spec);  

    return (
        <div>
            <div className="row">
                <div className="col">
                    <pre></pre>
                </div>
                
                <div className="col">
                    <div className="row">
                        <div className="col" id="view"></div>
                    </div>
                    <div className="row">
                        <div className="col"> 
                            <h4>Values (head=5)</h4>
                            <Table rows={data.slice(0, 5)}></Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default VegaLite;