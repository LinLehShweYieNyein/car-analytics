import { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const Favourites = () => {
    const [highlightedCars, setHighlightedCars] = useState([]);

    useEffect(() => {
        // Use the imported data instead of fetching
        const data = carDataJson;
        const highlighted = data.Cars.filter(car =>
            localStorage.getItem(`favorited_${car.Cid}`) === 'true'
        );
        setHighlightedCars(highlighted);
    }, []);

    const removeHighlight = (Cid) => {
        // Remove the highlight from localStorage
        localStorage.removeItem(`favorited_${Cid}`);

        // Update the state to remove the car from the highlighted list
        setHighlightedCars(prevCars => prevCars.filter(car => car.Cid !== Cid));
    };

    return (
        <Container style={{ marginTop: '130px' }}>
            <h2 style={{ color: '#C94349' }}>Favorited Cars</h2>
            <Row className="mt-3 gy-4">
                {highlightedCars.length > 0 ? (
                    highlightedCars.map((car) => (
                        <Col sm={12} md={6} lg={4} key={car.Cid}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/car/${car.Cid}`}>
                                            {car.NameMMT}
                                        </Link>
                                    </Card.Title>
                                    <Card.Text>
                                        Model: {car.Model} <br />
                                        Year: {car.Yr} <br />
                                        Price: {car.Prc} {car.Currency} <br />
                                        Province: {car.Province} <br />
                                    </Card.Text>
                                    <div>
                                        <Link to={`/car/${car.Cid}`}>
                                            {car.Img300 && <img src={car.Img300} alt={car.Model} style={{ width: '100%' }} />}
                                        </Link>
                                    </div>
                                    <Button
                                        variant="danger"
                                        onClick={() => removeHighlight(car.Cid)}
                                        className="mt-3 d-flex align-items-center"
                                    >
                                        Remove Favorite <FaStar className="ms-2" />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p style={{ color: '#C94349' }}>No favorited cars found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Favourites;
