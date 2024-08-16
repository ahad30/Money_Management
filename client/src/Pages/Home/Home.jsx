
import { Banner } from "./Banner";
import Blog from "./Blog/Blog";
import Slider from "./Slider";
                    
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
     
     <Slider></Slider>
     <Banner></Banner>
     <Blog></Blog>
    </div>
  );
};

export default Home;
