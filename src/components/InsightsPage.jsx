import { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Pie, Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js components
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const InsightPage = () => {
    const [data, setData] = useState({
        brands: {},
        models: {},
        years: {},
    });

    useEffect(() => {
        // Use the imported data instead of fetching
        const data = carDataJson;
        const brands = {};
        const models = {};
        const years = {};

        data.Cars.forEach(car => {
            const brand = car.NameMMT.split(' ')[0];
            const model = car.Model;
            const year = car.Yr;
            let price = parseFloat(car.Prc.replace(/,/g, ''));

            if (isNaN(price)) {
                price = 0;
            }

            if (!brands[brand]) {
                brands[brand] = { count: 0, value: 0 };
            }
            brands[brand].count += 1;
            brands[brand].value += price;

            if (!models[brand]) {
                models[brand] = {};
            }
            if (!models[brand][model]) {
                models[brand][model] = 0;
            }
            models[brand][model] += 1;

            if (!years[year]) {
                years[year] = { count: 0, totalValue: 0 };
            }
            years[year].count += 1;
            years[year].totalValue += price;
        });

        setData({
            brands,
            models,
            years
        });
    }, []);

    // Prepare data for charts
    const pieData = {
        labels: Object.keys(data.brands),
        datasets: [{
            data: Object.values(data.brands).map(b => b.value),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    const modelLabels = [...new Set(Object.keys(data.models).reduce((acc, brand) => {
        return [...acc, ...Object.keys(data.models[brand])];
    }, []))];

    const colorPalette = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FFCD56', '#4BC0C0', '#7C4DFF', '#F39C12'
    ];

    const stackedBarData = {
        labels: Object.keys(data.brands), // Brand names for x-axis
        datasets: modelLabels.map((model, index) => {
            const dataForModel = Object.keys(data.brands).map(brand => data.models[brand]?.[model] || 0);
            return {
                label: model,
                data: dataForModel,
                backgroundColor: colorPalette[index % colorPalette.length],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
            };
        })
    };

    const lineData = {
        labels: Object.keys(data.years),
        datasets: [{
            label: 'Average Price by Year',
            data: Object.keys(data.years).map(year => data.years[year].totalValue / data.years[year].count),
            fill: false,
            borderColor: '#FF6384',
            tension: 0.1
        }]
    };

    return (
        <Container style={{ marginTop: '130px' }}>
            {/* Summary Section */}
            <Row className="mb-4">
                <Col md={12}>
                    <h2>Car Insights</h2>
                    <p>Total Brands: {Object.keys(data.brands).length}</p>
                    <p>Total Models: {Object.values(data.models).reduce((acc, modelObj) => acc + Object.keys(modelObj).length, 0)}</p>
                </Col>
            </Row>

            {/* Pie chart for portion of cars by brand */}
            <Row>
                <Col md={6}>
                    <h3>Cars by Brand</h3>
                    <Pie
                        data={pieData}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(tooltipItem) {
                                            const label = tooltipItem.label || '';
                                            const value = tooltipItem.raw || 0;
                                            return `${label}: ${value.toLocaleString()} Baht`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </Col>
            </Row>

            {/* Stacked bar chart for models of each brand */}
            <Row>
                <Col md={12}>
                    <h3>Models of Each Brand</h3>
                    <Bar
                        data={stackedBarData}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(tooltipItem) {
                                            const label = tooltipItem.dataset.label || '';
                                            const value = tooltipItem.raw || 0;
                                            return `${label}: ${value}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    stacked: true,
                                    title: {
                                        display: true,
                                        text: 'Brand'
                                    }
                                },
                                y: {
                                    stacked: true,
                                    title: {
                                        display: true,
                                        text: 'Number of Models'
                                    }
                                }
                            }
                        }}
                    />
                </Col>
            </Row>

            {/* Line chart for price trends */}
            <Row>
                <Col md={12}>
                    <h3>Price Trends Over Years</h3>
                    <Line
                        data={lineData}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(tooltipItem) {
                                            const label = tooltipItem.dataset.label || '';
                                            const value = tooltipItem.raw || 0;
                                            return `${label}: ${value.toLocaleString()} Baht`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Year'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Average Price (Baht)'
                                    }
                                }
                            }
                        }}
                    />
                </Col>
            </Row>

            {/* Table for number of cars and values */}
            <Row>
                <Col md={12}>
                    <h3>Number of Cars and Values by Brands and Models</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Count</th>
                                <th>Value (Baht)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data.brands).map(([brand, { count, value }]) => (
                                <>
                                    <tr key={brand}>
                                        <td rowSpan={Object.keys(data.models[brand] || {}).length + 1}>{brand}</td>
                                        <td>Total</td>
                                        <td>{count}</td>
                                        <td>{value.toFixed(2)}</td>
                                    </tr>
                                    {Object.entries(data.models[brand] || {}).map(([model, modelCount]) => (
                                        <tr key={`${brand}-${model}`}>
                                            <td>{model}</td>
                                            <td>{modelCount}</td>
                                            <td>{((modelCount * value) / count).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default InsightPage;
