import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { } from 'react-bootstrap';
import './CouserDetail.css';




export default function CourseDetail() {
  const { id } = useParams();
  const [Courses, setCourses] = useState([]);
  const [Instructors, setInstructors] = useState([]);
  const [Profiles, setProfiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [Sessions, setSessions] = useState([]);
  const [AccessibleCourse, setAccessibleCourse] = useState({});
  const [email, setEmail] = useState('tuanpdhe171507@fpt.edu.vn');
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:9999/Courses/${id}`)
      .then(res => res.json())
      .then(result => {
        setCourses(result);
        setCourses(result.find(course => course.id === parseInt(id)));
      })
      .catch(err => console.log(err));

    fetch("http://localhost:9999/Instructors")
      .then(res => res.json())
      .then(result => setInstructors(result))
      .catch(err => console.log(err));

    fetch("http://localhost:9999/Profiles")
      .then(res => res.json())
      .then(result => setProfiles(result))
      .catch(err => console.log(err));


    // Fetch sessions based on course id
    fetch(`http://localhost:9999/Sessions?course=${id}`)
      .then(res => res.json())
      .then(result => {
        const filteredSessions = result.filter(session => session.course === parseInt(id));
        setSessions(filteredSessions);
      })
      .catch(err => console.log(err));

     fetch(`http://localhost:9999/AccessibleCourse?emailAddress=${encodeURIComponent(email)}&courseid=${encodeURIComponent(id)}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(result => {
      // Check if the course and email combination already exists in AccessibleCourse
      const enrolledCourse = result.find(course => course.emailAddress === email && course.courseid === parseInt(id));
      if (enrolledCourse) {
        setAccessibleCourse([enrolledCourse]); // Set state to indicate enrollment
      } else {
        setAccessibleCourse([]); // No enrollment found
      }
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });

  }, [id, email]);

  const showTab = (index) => {
    setSelectedTab(index);
  };

  const expandAll = () => {
    document.querySelectorAll('details').forEach((section) => {
      section.open = true;
    });
  };

  const handleMouseOver = (event) => {
    event.target.style.backgroundColor = 'gray';
  };

  const handleMouseOut = (event) => {
    event.target.style.backgroundColor = 'black';
  };

  const handleClick = () => {
  };

  if (!AccessibleCourse || !Courses || Instructors.length === 0 || Profiles.length === 0) {
    return <p>Loading...</p>;
  }

  let priceDisplay;
  if (Courses.price > 0) {
    priceDisplay = <p><i className="bi bi-currency-dollar"></i> {Courses.price}</p>;
  } else {
    priceDisplay = <p>Free</p>;
  }

  const a = Instructors.find(c => c.id == Courses.instrucotor)?.emailAddress;
  const profile = Profiles.find(p => p.emailAddress == a)?.fullName;
  const imageInstructor = Profiles.find(p => p.emailAddress == a)?.profilePicture;
  const prof = Profiles.find(p => p.emailAddress == a);
  const ins = Instructors.find(c => c.id == Courses.instrucotor);





  const lines = Courses.courseDescription.trim().split('.').map(line => line.trim());
  const lines1 = Courses.objective.trim().split('.').map(line => line.trim());
  const lines2 = Courses.prerequiresite.trim().split('.').map(line => line.trim());


  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9999/AccessibleCourse", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress: email,
          courseid:parseInt(id),
          enrolledTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Enrollment successful');
        navigate(`/courseEnroll?courseId=${id}&email=${email}`);
      } else {
        console.error('Enrollment failed');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


  return (
    <div className="container" style={{ maxWidth: "1840px" }}>
      <div className="row" style={{ padding: "20px 10%" }}>
        <div className="col-lg-5">
          <div className="ratio ratio-16x9">

            {Courses && (
              <div>
                <img className="w-100" src={`${Courses.thumbnail}`} style={{ width: '80%', height: '95%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="w-75">
            <h3>{Courses.courseName}</h3>
            <h5>{Courses.tagLine}</h5>
            <div className="pt-4">
              <h6>
                {Courses.badge && <span className="badge text-bg-warning">{Courses.badge}</span>}

              </h6>
              <h6>
                Created by
                <a href="#">{profile}</a>
              </h6>
              <h5>
                {priceDisplay}
              </h5>
              <h6>Last updated <span className="text-success">{Courses.lastUpdatedTime}</span></h6>
              {AccessibleCourse.length > 0? (
                 <Link to={`/coursePage`}>
                <button
                  style={{
                    backgroundColor: 'black',
                    width: '100%',
                    color: 'white',
                    padding: '10px',
                    transition: 'background-color 0.2s',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '10px'
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={handleClick}
                >
                       Go to Course
                </button>
                </Link>
              ) : (
                email !== ins.emailAddress && Courses.price > 0 ? (
                  <button
                    style={{
                      backgroundColor: 'black',
                      width: '100%',
                      color: 'white',
                      padding: '10px',
                      transition: 'background-color 0.2s',
                      border: 'none',
                      borderRadius: '5px',
                      marginBottom: '10px'
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleClick}
                  >
                    Add to Cart
                  </button>
                ) : (email !== ins.emailAddress &&
                
                    <button
                      style={{
                        backgroundColor: 'black',
                        width: '100%',
                        color: 'white',
                        padding: '10px',
                        transition: 'background-color 0.2s',
                        border: 'none',
                        borderRadius: '5px',
                        marginBottom: '10px'
                      }}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      onClick={handleAdd}
                    
                    >
                      Enroll now
                    </button>
                
                )
              )}
              {/* Disable enrollment button if user is instructor */}
              {email === ins.emailAddress && (
                <button
                  style={{
                    backgroundColor: 'black',
                    width: '100%',
                    color: 'white',
                    padding: '10px',
                    transition: 'background-color 0.2s',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '10px'
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={handleClick}
                  disabled
                >
                  Enroll Now (disabled)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 10%" }}>
        <button
          className={`btn p-3 m-0 tab ${selectedTab === 0 ? 'selected' : ''}`}
          type="button"
          onClick={() => showTab(0)}
        >
          Overview
        </button>
        <button
          className={`btn p-3 m-0 tab ${selectedTab === 1 ? 'selected' : ''}`}
          type="button"
          onClick={() => showTab(1)}
        >
          Course content
        </button>
        <button
          className={`btn p-3 m-0 tab ${selectedTab === 2 ? 'selected' : ''}`}
          type="button"
          onClick={() => showTab(2)}
        >
          Reviews
        </button>
        <button
          className={`btn p-3 m-0 tab ${selectedTab === 3 ? 'selected' : ''}`}
          type="button"
          onClick={() => showTab(3)}
        >
          Instructor
        </button>
        <hr className="m-0" />
        <div className="row">
          {selectedTab === 0 && (
            <div className="page col-6">
              <h5 className="pt-3">What you'll learn</h5>

              <ul>
                {lines1?.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <h5 className="pt-3">Description</h5>
              {lines?.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
          {selectedTab === 1 && (
            <div className="page col-6">
              <h5 className="pt-3">Requirements</h5>
              <ul>
                {lines2.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              <h5 className="pt-3">Sections</h5>
              {/* <span className="text-secondary">{course.sectionList.length} sections, {course.getSumOfLesson()} lessons</span> */}
              <button className="btn" style={{ marginLeft: "75%", marginTop: "-60px" }} type="button" onClick={expandAll}>
                Expand all sections
              </button>
              <div className="pt-2">
                {Sessions?.map((session, index) => (
                  <details key={index}>
                    <summary className="border p-3">
                      <h6>{session.sesionTitle}</h6>
                    </summary>
                    <div className="border p-3">
                      {session.LessonList?.map((lesson, idx) => (
                        <div key={idx}>{lesson.name}</div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div className="page col-6">
              <h5 className="pt-3">Student feedback</h5>
              <div className="row">
                <div className="col-3">
                  <div className="text-center" style={{ width: 'fit-content' }}>
                    {/* <h1>{course.getCourseRating()}</h1> */}
                    {/* Render stars based on course rating */}
                    <h6>Course rating</h6>
                  </div>
                </div>
                <div className="col-5">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div className="position-relative" key={index}>
                      <div className="progress mb-2" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ width: '0%' }}></div>
                      </div>
                      <span className="position-absolute top-0 end-0" style={{ transform: 'translate(170%, -20%)' }}>{rating}.0</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {selectedTab === 3 && (
            <div className="page col-6">
              <div className="row">
                <h5 className="pt-3">Instructor</h5>
                <div className="col-3">
                  <img className="w-100" style={{ borderRadius: "50%" }} src={imageInstructor} alt="Instructor" />
                </div>
                <div className="col-9">
                  <p>{prof.headline}</p>
                  <h6>
                    <Link to={`/detailProfile/${prof.emailAddress}`}>{prof.fullName}</Link>
                  </h6>
                  <span><i class="bi bi-star-fill"></i></span>
                  <span style={{ paddingLeft: "10px" }}>Instructor Rating <span className="text-secondary">(?)</span></span><br />
                  <span><i class="bi bi-people"></i></span>
                  <span style={{ paddingLeft: "10px" }}>Students <span className="text-secondary">(?)</span></span><br />
                  <span><i class="bi bi-play-btn"></i></span>
                  <span style={{ paddingLeft: "10px" }}>Courses <span className="text-secondary">(?)</span></span><br />

                </div>
                <div className="col-12 mt-3">
                  <p>{ins.biography}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}