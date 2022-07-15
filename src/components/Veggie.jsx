import { useEffect,useState  } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';

function Veggie() {

    const [Veggie, setVeggie] = useState([]);

    useEffect(() => {
      getVeggie();
    }, [])
    

const getVeggie = async () => {

    const check = localStorage.getItem("Veggie");

    if(check){
        setVeggie(JSON.parse(check));
    } else {
        const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
        );
        const data = await api.json(); 
        localStorage.setItem("Veggie", JSON.stringify(data.recipes));
        setVeggie(data.recipes);
    }

   
}

  return (
    <div>
        <Wrapper>
            <h3>Veggie Picks</h3>
            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem"
            }}>
            {Veggie.map((recipe) => {
                return(
                    <SplideSlide key={recipe.id}>
                    <Card>
                        <Link to={"/recipe/" + recipe.id}>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                        </Link>
                    </Card>
                    </SplideSlide>
                )
            })}
            </Splide>
        </Wrapper>
    </div>
  ); 
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 20rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius:2rem;
        postion: adsolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        postion: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transfrom: translate(-50%, 0%);
        color: green;
        width:100%;
        text-align:center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))
`



export default Veggie