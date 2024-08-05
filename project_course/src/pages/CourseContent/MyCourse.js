import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, ProgressBar, Row } from "react-bootstrap";


export default function MyCourse() {
    const [showModal, setShowModal] = useState(false);
    const [courseIdToUnenroll, setCourseIdToUnenroll] = useState(null);

    
    const [courses, setCourses] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const email = "binhlphe171141@fpt.edu.vn";

    useEffect(() => {
        fetch(`http://localhost:9999/AccessibleCourse?emailAddress=${email}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch accessible courses');
                }
                return res.json();
            })
            .then(accessibleCourses => {
                if (accessibleCourses.length > 0) {
                    // Map through each accessible course and fetch detailed course information
                    const fetchCourseDetails = accessibleCourses.map(course => {
                        return fetch(`http://localhost:9999/Courses?id=${course.courseid}`)
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error('Failed to fetch course details');
                                }
                                return res.json();
                            });
                    });

                    // Resolve all fetch requests for course details concurrently
                    return Promise.all(fetchCourseDetails);
                } else {
                    throw new Error('No accessible courses found');
                }
            })
            .then(courseDetails => {
                // courseDetails will be an array of arrays (each containing course details)
                // Flatten the array of arrays to a single array of courses
                const flattenedCourses = courseDetails.flat();
                setCourses(flattenedCourses);
            })
            .catch(err => console.error('Error fetching data:', err));

        fetch("http://localhost:9999/Profiles")
            .then(res => res.json())
            .then(result => setProfiles(result))
            .catch(err => console.log(err));
    }, [email]);

    const handleShowModal = (courseId) => {
        setCourseIdToUnenroll(courseId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCourseIdToUnenroll(null);
    };

    const handleUnenroll = () => {
        console.log(`Unenrolled from course with id: ${courseIdToUnenroll}`);
        handleCloseModal();
    };

    const openCoursePage = (courseId) => {
        // Navigate to course page
        window.location.href = `/news/${courseId}`;
    };

    
    return (
        <Container className="mb-5">
            <div className="mb-4" style={{ marginTop: '10px' }}>
                <h4>My courses</h4>
            </div>
            <Row className="gx-3">
                {courses.length === 0 ? (
                    <div className="alert text-dark">
                        <h6>You haven't enrolled in any courses yet.</h6>
                    </div>
                ) : (
                    courses.map((course) => (
                        <Col key={course.id} className="col-3">
                            <Card className="h-100 w-100">
                                <div className="ratio ratio-16x9 dropdown dropend border" onClick={() => openCoursePage(course.id)}>
                                    <Card.Img variant="top" src={course.thumbnail} />
                                </div>
                                <Card.Body onClick={() => openCoursePage(course.id)} style={{ overflow: 'hidden' }}>
                                    <Card.Title style={{ fontSize: '1rem' }}>{course.courseName}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <ProgressBar
                                        // now={course.completionPercentage} // Adjust as needed
                                        // label={`${course.completionPercentage}%`} // Adjust as needed
                                    />
                                </Card.Footer>
                                <Button
                                    type="button"
                                    className="btn btn-secondary rounded-2"
                                    style={{ width: '100px' }}
                                    onClick={() => handleShowModal(course.id)}
                                >
                                    Unenroll
                                </Button>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Unenrollment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to unenroll from this course?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleUnenroll(courseIdToUnenroll)}>
                        Unenroll
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}