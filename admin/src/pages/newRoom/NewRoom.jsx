import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useCookies } from "react-cookie";

const NewHotel = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined);
  const [cookies] = useCookies(["access_token"]);
  const { data, loading, error } = useFetch("http://localhost:3001/hotels");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      await axios.post(`http://localhost:3001/rooms/${hotelId}`, { ...info, roomNumbers }, {
        headers: { Authorization: cookies.access_token },
      });
  
      navigate("/rooms");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  rows="5"
                  cols="50"
                  placeholder="Seperate each room no. with a comma."
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data?.map((hotel) => (
                        <option value={hotel._id} key={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
