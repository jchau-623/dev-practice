import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './MySpots.css';
import NavBar from '../NavBar';
import Pagination from '../Pagination';
import EditSpotModal from '../EditSpotModal';

export default function MySpotsPage() {
  const dispatch = useDispatch();
  const user = useSelector(({ session }) => session.user);
  const spots = useSelector(({ spots }) =>
    Object.values(spots.spots).filter(spot => spot.user_id === user.id)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(null);
  const spotsPerPage = 5;

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const indexOfLastSpot = currentPage * spotsPerPage;
  const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
  const currentSpots = spots.slice(indexOfFirstSpot, indexOfLastSpot);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (spot) => {
    setCurrentSpot(spot);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentSpot(null);
  };

  return (
    <div className="my-listings-container">
      <NavBar />
      <h1>My Listings</h1>
      {currentSpots.length > 0 ? (
        currentSpots.map(spot => (
          <div key={spot.id} className="listing-item">
            <NavLink to={`/spots/${spot.id}`} className="spot-link">
              <div>
                <h2>{spot.name}</h2>
                <p>{spot.description}</p>
              </div>
            </NavLink>
            <button className="edit-button" onClick={() => handleEditClick(spot)}>Edit</button>
          </div>
        ))
      ) : (
        <p>You have no listings yet.</p>
      )}
      <Pagination
        itemsPerPage={spotsPerPage}
        totalItems={spots.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {showEditModal && (
        <EditSpotModal
          show={showEditModal}
          handleClose={handleCloseModal}
          spot={currentSpot}
        />
      )}
    </div>
  );
}
