import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        // Find the selected car from the imported data
        const selectedCar = carDataJson.Cars.find((car) => car.Cid === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    if (!car) return <div>Loading...</div>;

    return (
        <Container style={{ margin: "60px auto", maxWidth: "800px" }}>
            <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                    <Card.Title className="mb-4" style={{ fontSize: '2rem', color: '#C94349', fontWeight: 'bold' }}>
                        {car.NameMMT} {car.Model}
                    </Card.Title>
                    <Card.Text style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
                        <strong>Car ID:</strong> {car.Cid} <br />
                        <strong>Is Car Expired:</strong> {car.IsCExp ? 'Yes' : 'No'} <br />
                        <strong>Model:</strong> {car.Model} <br />
                        <strong>Year:</strong> {car.Yr} <br />
                        <strong>Price:</strong> {car.Prc} {car.Currency} <br />
                        <strong>Province:</strong> {car.Province} <br />
                        <strong>MkID:</strong> {car.MkID} <br />
                        <strong>MdID:</strong> {car.MdID} <br />
                        <strong>BdID:</strong> {car.BdID} <br />
                        <strong>Update:</strong> {car.Upd} <br />
                        <strong>Page Views:</strong> {car.PagesViews} <br />
                        <strong>Down Payment:</strong> {car.DPmt} <br />
                        <strong>Status:</strong> {car.Status} <br />
                    </Card.Text>
                    {car.Img300 && (
                        <div className="text-center mt-4">
                            <img 
                                src={car.Img300} 
                                alt={car.Model} 
                                style={{ 
                                    width: '100%', 
                                    maxWidth: '400px', 
                                    height: 'auto', 
                                    borderRadius: '10px',
                                    border: '2px solid #C94349' 
                                }} 
                            />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CarDetails;
