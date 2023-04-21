import {Colors} from "./Colors";

export const lineChartDataTotalSpent = [
    {
        name: "Revenue",
        data: [50, 64, 48, 66, 49, 68],
    },
    {
        name: "Profit",
        data: [30, 40, 24, 46, 20, 46],
    },
];

export const lineChartOptionsTotalSpent = {
    chart: {
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
        },
    },
    colors: [Colors.primary, "#80d0ff"],
    markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        labels: {
            style: {
                colors: Colors.dark3,
                fontSize: "12px",
                fontWeight: "700",
            },
        },
    },
    yaxis: {
        show: false,
    },
    legend: {
        show: false,
    },
    grid: {
        show: false,
        column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
        },
    },
};

export const barChartDataConsumption = [
    {
        name: "PRODUCT A",
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
    {
        name: "PRODUCT B",
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
];

export const barChartOptionsConsumption = {
    chart: {
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        style: {
            fontSize: "12px",
            fontFamily: undefined,
        },
        onDatasetHover: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
            },
        },
        theme: "dark",
    },
    xaxis: {
        categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
        show: false,
        labels: {
            show: true,
            style: {
                colors: Colors.dark3,
                fontSize: "14px",
                fontWeight: "500",
            },
        },
    },
    yaxis: {
        show: false,
        color: "black",
        labels: {
            show: false,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
            },
        },
    },

    grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
            lines: {
                show: false,
                opacity: 0.5,
            },
        },
        row: {
            opacity: 0.5,
        },
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    fill: {
        type: "solid",
        colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
        show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            columnWidth: "20px",
        },
    },
};

export const pieChartOptions = {
    labels: ["Replacement", "Delivered", "Others"],
    colors: [Colors.primary, "#6AD2FF", Colors.success],
    chart: {
        width: "50px",
    },
    states: {
        hover: {
            filter: {
                type: "none",
            },
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false,
                },
            },
        },
    },
    fill: {
        colors: [Colors.primary, "#6AD2FF", Colors.success],
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
};

export const pieChartData = [63, 25, 12];

export const replacements = [
    {
        customerName: 'Wakir Younus',
        productName: 'Fire-Boltt Dazzle Smartwatch Borderless',
        quantity: 1,
    },
    {
        customerName: 'Mohammed Ashiq',
        productName: 'boAt Wave Lite Smartwatch',
        quantity: 2,
    },
    {
        customerName: 'Thanveer',
        productName: 'Tecno Ace-A3 | 30 Hours Standby Time',
        quantity: 1,
    },
    {
        customerName: 'Kader Meeran',
        productName: 'New JBL Tune 130NC TWS | Active Noise Cancellation Earbuds',
        quantity: 1,
    },
    {
        customerName: 'Irfan',
        productName: 'Portronics SoundDrum 1 10W TWS Portable Bluetoot',
        quantity: 2,
    },
]