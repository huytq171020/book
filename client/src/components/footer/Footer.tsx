import { FunctionComponent } from "react";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <section className="flex flex-col lg:justify-end font-poppins">
          
                    <div className="pt-4 text-center text-gray-800 dark:text-gray-800">
                        <span>PH22408</span>
                    </div>
           
        
        </section>
    )
}

export default Footer;