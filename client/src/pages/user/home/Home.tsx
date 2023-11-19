
import ListProductItems from "@/components/products/ListItems";

import { FunctionComponent } from "react";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return <div>
   

        <div className="mt-6 px-4">
            <ListProductItems heading="Book " />
        </div>

    
    

       
    </div>
}

export default Home;