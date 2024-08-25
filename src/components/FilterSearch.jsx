import { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import '/src/styles/FilterSearch.css'; // Updated CSS file

const FilterSearch = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onFilter(query);
  };

  return (
    <Form onSubmit={handleSearch} className="filter-search">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search for cars..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="filter-input"
        />
        <Button variant="danger" type="submit" className="filter-button">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FilterSearch;
