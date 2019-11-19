import React, { Component } from 'react';

class ColorSwatch extends Component {
    render() {
        return (
            <div style={{border: "1px solid #CCC", margin: "10px 5px"}}>
                <div style={{background: this.props.color, width: "150px", height: "150px"}}></div>
                <div style={{padding: "5px"}}>
                    <strong>{this.props.name}</strong>
                    <p>{this.props.color}</p>
                    <pre>{this.props.variable}</pre>
                </div>
            </div>
        )
    }
}

class ColorSwatches extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div style={{display: "flex", maxWidth: "100vw", padding: "2rem"}}>
                    {this.props.colors.map( color => <ColorSwatch color={color.hex} name={color.name} variable={color.variable} />)}
                </div>
            </div> 
        )
    }
}

export default { title: 'Colors' };

const blues = {
    title: "Blues",
    colors: [
        {
            variable: "$blue_base",
            name: "Base",
            hex: "#003da1"
        },
        {
            variable: "$blue_dark",
            name: "Dark",
            hex: "#122377"
        },
        {
            variable: "$blue_medium",
            name: "Medium",
            hex: "#c0e9ff"
        },
        {
            variable: "$blue_light",
            name: "Light",
            hex: "#e8f6fa"
        },
        {
            variable: "$blue_accent",
            name: "Accent",
            hex: "#00a8f7"
        },
        {
            variable: "$blue_digital",
            name: "Digital",
            hex: "#196ecf"
        }
    ]
}

export const Blues = () => <ColorSwatches title={blues.title} colors={blues.colors} />
