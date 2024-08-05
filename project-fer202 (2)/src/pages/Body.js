import { Col, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SlideList from './SlideList';
import { useEffect, useState } from 'react';

export default function Body() {
  const navigate = useNavigate();

  const [Courses, setCourses] = useState([]);
  const [Instructors, setInstructors] = useState([]);
  const [Profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/Courses")
      .then(res => res.json())
      .then(result => setCourses(result))
      .catch(err => console.log(err));

    fetch("http://localhost:9999/Instructors")
      .then(res => res.json())
      .then(result => setInstructors(result))
      .catch(err => console.log(err));

    fetch("http://localhost:9999/Profiles")
      .then(res => res.json())
      .then(result => setProfiles(result))
      .catch(err => console.log(err));
  }, []);

  if (Courses.length === 0 || Instructors.length === 0 || Profiles.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid border-bottom">
      <div className="container pt-3 pb-3" style={{ maxWidth: "1840px" }}>
        <div>
          <SlideList />
        </div>
        <h1>Leading courses</h1>
        <h5>Because you searched for "<Link to=''>a keyword</Link>"</h5>
        <Row style={{ padding: "0px 0px", marginBottom: "50px", marginTop: "50px" }}>
          {Courses.map((course, index) => {
            const instructor = Instructors.find(instr => instr.id == course.instrucotor)?.emailAddress;
            const profile = Profiles.find(p => p.emailAddress == instructor)?.fullName;

            let priceDisplay;
            if (course.price > 0) {
              priceDisplay = <p><i className="bi bi-currency-dollar"></i> {course.price}</p>;
            } else {
              priceDisplay = <p>Free</p>;
            }

            return (
              <Col key={index} lg={3} md={6} sm={6} xs={12} style={{ padding: "0px 10px", marginBottom: "20px" }}>
                <div>
                  <Row className="g-0" style={{ border: '1px solid rgb(169,169,169)', height: "400px", boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)" }}>
                    <Col style={{ backgroundColor: "white", maxWidth: "100%" }}>
                      <Link to={`/news/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Image
                          src={`${course.thumbnail}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                        <h4 style={{ margin: '0', color: 'inherit' }}>{course.courseName}</h4>
                        <h6>{course.tagLine}</h6>
                      </Link>
                      <h5 style={{ opacity: "0.5" }}>{profile}</h5>
                      <Row style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        <Col>
                          <h5 style={{ color: "orangered" }}>
                            {priceDisplay}
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}