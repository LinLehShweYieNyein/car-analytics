import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination } from 'react-bootstrap';
import FilterSearch from './FilterSearch';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaHeart, FaRegHeart } from 'react-icons/fa';
import '/src/styles/HomePage.css';
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const HomePage = () => {
  const [carData, setCarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [visibleItems, setVisibleItems] = useState(21);
  const itemsPerPage = 21;

  // Initialize data from the imported JSON
  useEffect(() => {
    const carsWithFavorite = carDataJson.Cars.map(car => ({
      ...car,
      favorited: localStorage.getItem(`favorited_${car.Cid}`) === 'true'
    }));
    setCarData(carsWithFavorite);
    setFilteredData(carsWithFavorite);
  }, []);

  const handleFilter = (query) => {
    const normalizedQuery = query.replace(/,/g, '').toLowerCase();
    const filtered = carData.filter(car => {
      const normalizedPrice = (car.Prc || '').replace(/,/g, '');
      return (car.NameMMT || '').toLowerCase().includes(normalizedQuery) ||
        (car.Model || '').toLowerCase().includes(normalizedQuery) ||
        (car.Yr || '').toString().includes(normalizedQuery) ||
        normalizedPrice.includes(normalizedQuery) ||
        (car.Province || '').toLowerCase().includes(normalizedQuery);
    });
    setFilteredData(filtered);
    setCurrentPage(1);
    setVisibleItems(itemsPerPage);
  };

  const handleSortChange = (criteria) => {
    const newDirection = sortCriteria === criteria && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortCriteria(criteria);
    setSortDirection(newDirection);
    sortData(criteria, newDirection);
  };

  const sortData = (criteria, direction) => {
    let sortedData = [...filteredData];
    const compare = (a, b) => {
      if (criteria === 'price') {
        const priceA = parseFloat(a.Prc.replace(/,/g, ''));
        const priceB = parseFloat(b.Prc.replace(/,/g, ''));
        return direction === 'asc' ? priceA - priceB : priceB - priceA;
      } else if (criteria === 'year') {
        return direction === 'asc' ? a.Yr - b.Yr : b.Yr - a.Yr;
      } else if (criteria === 'name') {
        return direction === 'asc' ? a.NameMMT.localeCompare(b.NameMMT) : b.NameMMT.localeCompare(a.NameMMT);
      } else if (criteria === 'model') {
        return direction === 'asc' ? a.Model.localeCompare(b.Model) : b.Model.localeCompare(a.Model);
      }
      return 0;
    };
    sortedData.sort(compare);
    setFilteredData(sortedData);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(page);
      setVisibleItems(page * itemsPerPage);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + itemsPerPage);
  };

  const toggleFavorite = (Cid) => {
    const updatedCarData = carData.map(car => {
      if (car.Cid === Cid) {
        const updatedFavoriteStatus = !car.favorited;
        localStorage.setItem(`favorited_${Cid}`, updatedFavoriteStatus);
        return { ...car, favorited: updatedFavoriteStatus };
      }
      return car;
    });

    setCarData(updatedCarData);
    setFilteredData(updatedCarData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Container className="home-page" style={{ marginTop: '130px' }}>
      <h2 className="text-center" style={{ marginBottom: '70px' }}>Cars Dashboard</h2>
      <FilterSearch onFilter={handleFilter} />
      <div className="sort-buttons-container d-flex justify-content-start my-4">
        <Button
          className={`sort-button ${sortCriteria === 'name' ? 'active' : ''}`}
          onClick={() => handleSortChange('name')}
        >
          Brand {sortCriteria === 'name' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </Button>
        <Button
          className={`sort-button ${sortCriteria === 'model' ? 'active' : ''}`}
          onClick={() => handleSortChange('model')}
        >
          Model {sortCriteria === 'model' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </Button>
        <Button
          className={`sort-button ${sortCriteria === 'year' ? 'active' : ''}`}
          onClick={() => handleSortChange('year')}
        >
          Year {sortCriteria === 'year' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </Button>
        <Button
          className={`sort-button ${sortCriteria === 'price' ? 'active' : ''}`}
          onClick={() => handleSortChange('price')}
        >
          Price {sortCriteria === 'price' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Province</th>
            <th>Image</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(car => (
            <tr key={car.Cid}>
              <td><Link to={`/car/${car.Cid}`}>{car.NameMMT}</Link></td>
              <td>{car.Model}</td>
              <td>{car.Yr}</td>
              <td>{car.Prc} {car.Currency}</td>
              <td>{car.Province}</td>
              <td>
                {car.Img300 && <img src={car.Img300} alt={car.Model} style={{ width: '100px' }} />}
              </td>
              <td>
                <Button
                  variant={car.favorited ? "secondary" : "danger"}
                  onClick={() => toggleFavorite(car.Cid)}
                >
                  {car.favorited ? <FaHeart /> : <FaRegHeart />} {car.favorited ? 'Unfavorite' : 'Favorite'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mt-4 d-flex justify-content-center">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default HomePage;
