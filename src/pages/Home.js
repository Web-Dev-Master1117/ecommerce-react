import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";


function Home(){
    return(
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Link to='/admin' >Admin</Link>
        </div>
    )
}

export default Home;