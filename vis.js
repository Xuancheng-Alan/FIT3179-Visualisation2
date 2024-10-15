// Melbourne Map   1
const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "params": [
        {
            "name": "zoom_level",
            "value": 9000,
            "bind": {
                "input": "range",
                "min": 0,
                "max": 30000,
                "step": 100,
                "name": "Zoom: "
            }
        },
        {
            "name": "center_to",
            "value": [144.9631, -37.8136],
            "bind": {
                "input": "select",
                "options": [
                    [144.9631, -37.8136]
                ],
                "labels": ["Victoria"],
                "name": "Map Centre: "
            }
        }
    ],
    "projection": {
        "type": "mercator",
        "scale": {"expr": "zoom_level"},
        "center": {"expr": "center_to"}
    },
    "width": 800,
    "height": 600,

    "layer": [
        {
            "data": {
                "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/suburb-10-vic.json",
                "format": {
                    "type": "topojson",
                    "feature": "suburb-10-vic"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "white",
                "stroke": "gray",
                "strokeWidth": 0.5
            }
        },
        {
            "data": {
                "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/VPA_Open_Space%20.json",
                "format": {
                    "type": "topojson",
                    "feature": "VPA_Open_Space"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "green"
            },
            "encoding": {
                "tooltip": [
                    { "field": "properties.OWNER_TYPE", "type": "nominal", "title": "Owner Type" },
                    { "field": "properties.PARK_NAME", "type": "nominal", "title": "Park Name" },
                    { "field": "properties.OS_STATUS", "type": "nominal", "title": "Status" },
                    { "field": "properties.OS_ACCESS", "type": "nominal", "title": "Access" },
                    { "field": "properties.HA", "type": "nominal", "title": "Area(Ha)" }
                ]
            }
        },
        {
            "data": {
                "values": [
                    { "state": "Victoria", "lat": -37.8136, "lon": 144.9631 }
                ]
            },
            "mark": {
                "type": "text",
                "fontSize": 15,
                "dy": -60,
                "dx": -30
            },
            "encoding": {
                "longitude": { "field": "lon", "type": "quantitative" },
                "latitude": { "field": "lat", "type": "quantitative" },
                "text": { "field": "state" },
                "color": { "value": "darkblue" }
            }
        }
    ]
};
vegaEmbed('#vis', spec).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});
//Sydney Map     2
const spec6 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 700,
    "height": 500,
    "params": [
        {
            "name": "zoom_level",
            "value": 9000,
            "bind": {
                "input": "range",
                "min": 0,
                "max": 30000,
                "step": 100,
                "name": "Zoom: "
            }
        },
        {
            "name": "center_to",
            "value": [151.0301, -33.9098]
        }
    ],
    "projection": {
        "type": "mercator",
        "scale": {"expr": "zoom_level"},
        "center": {"expr": "center_to"}
    },
    "layer": [
        {
            "data": {
                "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/suburb-2-nsw.json",
                "format": {
                    "type": "topojson",
                    "feature": "suburb-2-nsw"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "white",
                "stroke":"grey",
                "strokeWidth":0.5
            }
        },
        {
            "data": {
                "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/Existing_Green_Assets.json",
                "format": {
                    "type": "topojson",
                    "feature": "Existing_Green_Assets"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "green"
            },
            "encoding": {
                "tooltip": [
                    { "field": "properties.ASSET_NAME", "type": "nominal", "title": "Asset Name" },
                    { "field": "properties.LAY_CLASS", "type": "nominal", "title": "Layer Class" },
                    { "field": "properties.SIGNIFICAN", "type": "nominal", "title": "Significance" },
                    { "field": "properties.LAND_STATU", "type": "nominal", "title": "Land Status" }
                ]
            }
        }

    ]
};
vegaEmbed('#vis6', spec6).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});
//Heatmap of Average Monthly Temperature by Year and Location
const spec2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 600,
    "height": 400,
    "data": {
        "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/weatherAUS.csv"
    },
    "params": [
        {
            "name": "TempType",
            "value": "MinTemp",
            "bind": {
                "input": "select",
                "options": ["MinTemp", "MaxTemp"],
                "labels": ["Average Monthly Minimum", "Average Monthly Maximum"],
                "name": "Select Temperature Type: "
            }
        },
        {
            "name": "LocationSelection",
            "value": "Sydney",
            "bind": {
                "input": "select",
                "options": ["Sydney", "Adelaide", "Brisbane", "Canberra", "Darwin", "GoldCoast", "Hobart", "Melbourne", "Perth"],
                "name": "Select Location: "
            }
        }
    ],
    "transform": [
        {
            "filter": "datum.Location == LocationSelection"
        },
        {
            "timeUnit": "year",
            "field": "Date",
            "as": "Year"
        },
        {
            "timeUnit": "month",
            "field": "Date",
            "as": "Month"
        },
        {
            "calculate": "datum[TempType]",
            "as": "SelectedTemp"
        },
        {
            "filter": "datum.SelectedTemp != null && !isNaN(datum.SelectedTemp)"
        },
        {
            "aggregate": [
                {"op": "mean", "field": "SelectedTemp", "as": "AvgTemp"}
            ],
            "groupby": ["Year", "Month"]
        },
        {
            "impute": "AvgTemp",
            "key": "Month",
            "keyvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "groupby": ["Year"],
            "method": "value",
            "value": null
        }
    ],
    "mark": "rect",
    "encoding": {
        "x": {
            "field": "Year",
            "type": "temporal",
            "timeUnit": "year",
            "title": "Year"
        },
        "y": {
            "field": "Month",
            "type": "ordinal",
            "title": "Month",
            "timeUnit": "month",
            "axis": {
                "format": "%B"
            }
        },
        "color": {
            "field": "AvgTemp",
            "type": "quantitative",
            "title": "Average Temperature (°C)",
            "scale": {"scheme": "reds"},
            "legend": {
                "orient": "bottom"
            }
        },
        "tooltip": [
            {"field": "Year", "type": "temporal", "title": "Year", "timeUnit": "year"},
            {"field": "Month", "type": "ordinal", "title": "Month", "timeUnit": "month"},
            {"field": "AvgTemp", "type": "quantitative", "title": "Average Temperature (°C)"}
        ]
    }
};
vegaEmbed('#vis2', spec2).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});
//World PM10    4
const spec3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Averaged PM10 Levels by Country from 2010 to 2020",
    "width": 600,
    "height": 400,
    "data": {
        "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/who_aap_2021_v9_11august2022.csv",
        "format": {"type": "csv"}
    },
    "transform": [
        {
            "calculate": "toNumber(datum['PM10'])",
            "as": "PM10"
        },
        {
            "filter": "datum.PM10 != null && isFinite(datum.PM10)"
        },
        {
            "calculate": "toNumber(datum['Year'])",
            "as": "Year"
        },
        {
            "filter": "datum.Year >= 2010"
        }
    ],
    "params": [
        {
            "name": "Region_selection",
            "value": "Western Pacific Region",
            "bind": {
                "input": "select",
                "options": [
                    "African Region", "Region of the Americas", "Eastern Mediterranean Region", "European Region", "South East Asia Region", "Western Pacific Region"
                ],
                "name": "Select Region: "
            }
        }
    ],
    "transform": [
        {
            "filter": "datum['WHO Region'] == Region_selection"
        },
        {
            "aggregate": [
                {"op": "mean", "field": "PM10", "as": "Avg_PM10"}
            ],
            "groupby": ["CountryName", "Year"]
        }
    ],
    "selection": {
        "highlight": {
            "type": "multi",
            "fields": ["CountryName"],
            "bind": "legend"
        }
    },
    "mark": "line",
    "encoding": {
        "x": {
            "field": "Year",
            "type": "quantitative",
            "title": "Year",
            "axis": {
                "format": "d"
            }
        },
        "y": {
            "field": "Avg_PM10",
            "type": "quantitative",
            "title": "Average PM10 Level (μg/m³)"
        },
        "color": {
            "field": "CountryName",
            "legend": {
                "title": "Country",
                "orient": "right",
                "columns": 1,
                "symbolLimit": 60
            },
            "scale": {"range": ["gray"]},
            "condition": {
                "selection": "highlight",
                "value": "green"
            }
        },
        "opacity": {
            "condition": {"selection": "highlight", "value": 1},
            "value": 0.2
        },
        "tooltip": [
            {"field": "CountryName", "type": "nominal", "title": "Country"},
            {"field": "Year", "type": "quantitative", "title": "Year"},
            {"field": "Avg_PM10", "type": "quantitative", "title": "Average PM10 Level (μg/m³)"}
        ]
    }
};
vegaEmbed('#vis3', spec3).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});
//rainfall in Australia    5
const spec4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "config": {
        "view": {
            "continuousWidth": 1200,
            "continuousHeight": 400
        }
    },
    "data": {
        "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/weatherAUS.csv"  // 替换为你的 CSV 文件路径
    },
    "vconcat": [
        {
            "width": 1200,
            "height": 300,
            "mark": "bar",
            "selection": {
                "highlight": {
                    "type": "multi",
                    "fields": ["Location"],
                    "bind": "legend"
                }
            },
            "encoding": {
                "x": {
                    "field": "Location",
                    "type": "nominal",
                    "title": "Location",
                    "axis": {"labelAngle": 45}
                },
                "y": {
                    "field": "Rainfall",
                    "type": "quantitative",
                    "title": "Rainfall (mm)"
                },
                "color": {
                    "field": "Location",
                    "title": "Location",
                    "type": "nominal",
                    "legend": {
                        "title": "Locations",
                        "columns": 2,
                        "symbolLimit": 100
                    }
                },
                "opacity": {
                    "condition": {
                        "selection": "highlight",
                        "value": 1
                    },
                    "value": 0.2
                },
                "tooltip": [
                    {"field": "Date", "type": "temporal", "title": "Date"},
                    {"field": "Location", "type": "nominal", "title": "Location"},
                    {"field": "Rainfall", "type": "quantitative", "title": "Rainfall (mm)"}
                ]
            },
            "transform": [
                {"filter": {"param": "brush"}}
            ]
        },

        {
            "title": {
                "text": " ",
                "anchor": "middle",
                "fontSize": 13,
                "fontWeight": "lighter"
            },
            "width": 1200,
            "height": 60,
            "mark": "rule",
            "params": [{
                "name": "brush",
                "select": {"type": "interval", "encodings": ["x"]}
            }],
            "encoding": {
                "x": {
                    "field": "Date",
                    "type": "temporal",
                    "title": "Date",
                    "axis": {"format": "%Y", "title": "Year"}
                },
                "y": {
                    "field": "Rainfall",
                    "type": "quantitative",
                    "title": null,
                    "axis": {"tickCount": 3, "grid": false}
                }
            }
        }
    ]
};
vegaEmbed('#vis4', spec4).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});
//Australia's Easiest Cities    6
const spec5 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 500,
    "layer": [
        {
            "data": {
                "url": "https://raw.githubusercontent.com/Xuancheng-Alan/FIT3179/refs/heads/main/Datasets/australian-states.json",
                "format": {
                    "type": "topojson",
                    "feature": "australian-states"
                }
            },
            "transform": [
                {
                    "lookup": "properties.STATE_NAME",
                    "from": {
                        "data": {
                            "values": [
                                {"STATE_NAME": "Western Australia", "percentage": 22},
                                {"STATE_NAME": "Northern Territory", "percentage": 66},
                                {"STATE_NAME": "South Australia", "percentage": 26},
                                {"STATE_NAME": "Queensland", "percentage": 79},
                                {"STATE_NAME": "New South Wales", "percentage": 44},
                                {"STATE_NAME": "Australian Capital Territory", "percentage": 58},
                                {"STATE_NAME": "Tasmania", "percentage": 71},
                                {"STATE_NAME": "Victoria", "percentage": 30}
                            ]
                        },
                        "key": "STATE_NAME",
                        "fields": ["percentage"]
                    }
                }
            ],
            "mark": {
                "type": "geoshape",
                "stroke": "gray",
                "strokeWidth": 1
            },
            "encoding": {
                "color": {
                    "field": "percentage",
                    "type": "quantitative",
                    "scale": {
                        "scheme": "greens"
                    },
                    "title": "Tree Canopy Coverage (%)"
                },
                "tooltip": [
                    { "field": "properties.STATE_NAME", "type": "nominal", "title": "State Name" },
                    { "field": "percentage", "type": "quantitative", "title": "Percentage (%)",
                        "format": ".1f" }
                ]
            }
        },
        {
            "data": {
                "values": [
                    {"STATE_NAME": "Western Australia", "longitude": 121.5, "latitude": -25.0, "percentage": 22},
                    {"STATE_NAME": "Northern Territory", "longitude": 133.5, "latitude": -19.5, "percentage": 66},
                    {"STATE_NAME": "South Australia", "longitude": 135.5, "latitude": -30.0, "percentage": 26},
                    {"STATE_NAME": "Queensland", "longitude": 147.0, "latitude": -23.0, "percentage": 79},
                    {"STATE_NAME": "New South Wales", "longitude": 146.0, "latitude": -32.0, "percentage": 44},
                    {"STATE_NAME": "Tasmania", "longitude": 146.7, "latitude": -42.0, "percentage": 71},
                    {"STATE_NAME": "Victoria", "longitude": 144.5, "latitude": -37.0, "percentage": 30}
                ]
            },
            "layer": [
                {
                    "mark": {
                        "type": "text",
                        "align": "center",
                        "dy": -10,
                        "fontSize": 14,
                        "fontWeight": "bold",
                        "color": "black"
                    },
                    "encoding": {
                        "longitude": {"field": "longitude", "type": "quantitative"},
                        "latitude": {"field": "latitude", "type": "quantitative"},
                        "text": {"field": "STATE_NAME", "type": "nominal"}
                    }
                },
                {
                    "mark": {
                        "type": "text",
                        "align": "center",
                        "dy": 10,
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "color": "black"
                    },
                    "transform": [
                        {
                            "calculate": "datum.percentage + '%'",
                            "as": "PercentageWithSymbol"
                        }
                    ],
                    "encoding": {
                        "longitude": {"field": "longitude", "type": "quantitative"},
                        "latitude": {"field": "latitude", "type": "quantitative"},
                        "text": {"field": "PercentageWithSymbol", "type": "nominal"}
                    }
                }
            ]
        },
        {
            "data": {
                "values": [
                    {"STATE_NAME": "Australian Capital Territory", "longitude": 154, "latitude": -35.3, "percentage": 58}
                ]
            },
            "mark": {
                "type": "text",
                "align": "left",
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "black"
            },
            "transform": [
                {
                    "calculate": "datum.STATE_NAME + ' ' + datum.percentage + '%'",
                    "as": "ACT_Label"
                }
            ],
            "encoding": {
                "longitude": {"field": "longitude", "type": "quantitative"},
                "latitude": {"field": "latitude", "type": "quantitative"},
                "text": {"field": "ACT_Label", "type": "nominal"}
            }
        },
        {
            "data": {
                "values": [
                    {"longitude_start": 149.0, "latitude_start": -35.3, "longitude_end": 154, "latitude_end": -35.3}
                ]
            },
            "mark": {
                "type": "rule",
                "strokeWidth": 2,
                "color": "black"
            },
            "encoding": {
                "longitude": {"field": "longitude_start", "type": "quantitative"},
                "latitude": {"field": "latitude_start", "type": "quantitative"},
                "longitude2": {"field": "longitude_end"},
                "latitude2": {"field": "latitude_end"}
            }
        }
    ]
};
vegaEmbed('#vis5', spec5).then(result => {
    console.log("Visualization successfully rendered", result);
}).catch(error => {
    console.error("Error rendering visualization:", error);
    alert("Failed to render the visualization. Check console for details.");
});