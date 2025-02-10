import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors"; // Import colors
import Carousel from "react-bootstrap/Carousel"; // Import Bootstrap carousel
import comedyShow from '../../assets/comedy show.jpeg';
import concert from '../../assets/concert.jpg';
import farmerMarket from '../../assets/farmer market.jpg';
import play from '../../assets/play.jpg';


const Home = () => {
  // Event categories for carousel
  const eventCategories = [
    {
      title: "Live Concerts",
      description: "Find amazing live music events happening near you!",
      image: concert, // Update with actual image path
    },
    {
      title: "Farmers Markets",
      description: "Discover fresh, local produce at nearby farmers markets.",
      image: farmerMarket,
    },
    {
      title: "Theater & Plays",
      description: "Enjoy a night out watching live theater performances.",
      image: play,
    },
    {
      title: "Comedy Shows",
      description: "Laugh out loud at the best comedy shows in your area.",
      image: comedyShow,
    },
  ];

  return (
    <MainLayout title="Home">
      {/* Hero Section */}
      <div style={styles.heroContainer}>
        <h1 style={styles.heroTitle}>AroundU</h1>
        <h2 style={styles.heroSubtitle}>
          Your Go-To Platform for Discovering, Hosting, and Managing Events Seamlessly.
        </h2>
      </div>

      {/* Carousel Section */}
      <div style={styles.carouselContainer}>
        <Carousel>
          {eventCategories.map((event, index) => (
            <Carousel.Item key={index}>
              <div style={{ ...styles.carouselItem, backgroundImage: `url(${event.image})` }}>
                <div style={styles.carouselOverlay}>
                  <h3 style={styles.carouselTitle}>{event.title}</h3>
                  <p style={styles.carouselDescription}>{event.description}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </MainLayout>
  );
};

const styles = {
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "50vh",
    backgroundColor: colors.platinum,
    padding: "20px",
  },
  heroTitle: {
    fontSize: "50px",
    fontWeight: "bold",
    color: colors.red,
    marginBottom: "10px",
  },
  heroSubtitle: {
    fontSize: "22px",
    color: colors.richBlack,
    maxWidth: "600px",
  },
  carouselContainer: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "40px",
  },
  carouselItem: {
    height: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  carouselOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  carouselTitle: {
    fontSize: "30px",
    color: colors.white,
  },
  carouselDescription: {
    fontSize: "18px",
    color: colors.white,
  },
};

export default Home;