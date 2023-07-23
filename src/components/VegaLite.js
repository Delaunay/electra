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

const VegaLite = ({}) => {
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

    embed('#view', spec);

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col" id="view"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <Table rows={data.slice(0, 10)}></Table>
                </div>
            </div>
        </div>
    )
}



export default VegaLite;