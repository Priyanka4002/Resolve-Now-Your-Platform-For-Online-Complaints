/*import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({})

  const [statusCompliants, setStatusCompliants] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
       ...prevState,
       [complaintId]: !prevState[complaintId],
    }));
 };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
        {statusCompliants.length > 0 ? (
          statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card key={index} style={{ width: '18.5rem', margin: '0 15px 15px 0' }}>
                <Card.Body>
                  <Card.Title>Name: {complaint.name}</Card.Title>
                  <Card.Text>Address: {complaint.address}</Card.Text>
                  <Card.Text>City: {complaint.city}</Card.Text>
                  <Card.Text>State: {complaint.state}</Card.Text>
                  <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                  <Card.Text>Comment: {complaint.comment}</Card.Text>
                  <Card.Text>Status: {complaint.status}</Card.Text>
                  <Button className='mb-2' style={{float: 'right'}} onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open} variant="primary">
                    Message
                  </Button>
                  <div style={{ minHeight: '100%'}}>
                    <Collapse in={open} dimension="width">
                      <div id="example-collapse-text">
                        <Card body style={{ width: '260px', marginTop: '12px' }}>
                          <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                </Card.Body>
              </Card>
            )

          })
        ) : (
          <Alert variant="info">
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>



    </>
  )
}

export default Status;









// import React, { useEffect, useState } from 'react'
// const Status = () => {
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [complaint, setComplaint] = useState("")

//   // useEffect(()=>{
//   //   const id = localStorage.getItem("user")
//   //   console.log(id)

//   //     // axios.get(`http://localhost:8000/status${id}`)
//   //     // .then((res)=>{
//   //     //   const { city, state, complaint } = res.data;
//   //     //   console.log(city,state,complaint)
//   //     //   setState(state);
//   //     //   setCity(city);
//   //     //   setComplaint(complaint)
//   //     // })
//   //     // .catch((err)=>{
//   //     //   console.log(err)
//   //     // })
//   // },[])
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const { _id } = user;
//     console.log(_id);
//     axios.get(`http://localhost:8000/status/${_id}`)
//       .then((res) => {
//         axios.get('http://localhost:8000/Complaint')
//           .then((res) => {
//             const { city, state, complaint } = res.data;
//             console.log(city, state, complaint)
//             setState(state);
//             setCity(city);
//             setComplaint(complaint)
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, []);

//   return (
//     <>
//       <div className="row">
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">City:{city}</h5>
//               <p className="card-text">State:{state} </p>
//               <p className="card-text">Complaint:{complaint} </p>

//             </div>
//           </div>
//         </div>
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">h</h5>
//               <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />In, voluptatibus!</p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Status
*/


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  const handleCancelComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this complaint?")) return;

    try {
      const res = await axios.put(`http://localhost:8000/complaints/${id}/cancel`);
      if (res.data.success) {
        alert("Complaint cancelled successfully");
        // Refresh complaint list
        const user = JSON.parse(localStorage.getItem('user'));
        const { _id } = user;
        const updatedRes = await axios.get(`http://localhost:8000/status/${_id}`);
        setStatusCompliants(updatedRes.data);
      } else {
        alert("Cancellation failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while cancelling the complaint");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
        {statusCompliants.length > 0 ? (
          statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card key={index} style={{ width: '18.5rem', margin: '0 15px 15px 0' }}>
                <Card.Body>
                  <Card.Title>Name: {complaint.name}</Card.Title>
                  <Card.Text>Address: {complaint.address}</Card.Text>
                  <Card.Text>City: {complaint.city}</Card.Text>
                  <Card.Text>State: {complaint.state}</Card.Text>
                  <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                  <Card.Text>Comment: {complaint.comment}</Card.Text>
                  <Card.Text>Status: {complaint.status}</Card.Text>

                  <div className="d-flex justify-content-between">
                    <Button
                      className="mb-2"
                      onClick={() => handleToggle(complaint._id)}
                      aria-controls={`collapse-${complaint._id}`}
                      aria-expanded={open}
                      variant="primary"
                    >
                      Message
                    </Button>

                    {complaint.status !== 'Cancelled' && (
                      <Button
                        className="mb-2"
                        variant="danger"
                        onClick={() => handleCancelComplaint(complaint._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>

                  <div style={{ minHeight: '100%' }}>
                    <Collapse in={open} dimension="width">
                      <div id={`collapse-${complaint._id}`}>
                        <Card body style={{ width: '260px', marginTop: '12px' }}>
                          <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info">
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Status;
